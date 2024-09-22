from django.http import HttpResponse, JsonResponse
from .models import Tracker, Alert
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from .utils import createRandomUUID, get_location_data, send_alert_email, send_reset_password_email, send_verification_email
from .serializers import TrackerSerializer,AlertSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from backend.settings import BACKEND_URL, FRONTEND_URL
from .serializers import RegisterSerializer, LoginSerializer, ResetPasswordSerializer, SetNewPasswordSerializer
import requests
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from reportlab.pdfgen import canvas
import razorpay

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LogoutView(APIView):
    def post(self, request):
        try:
            # Extract the refresh token from the request data
            refresh_token = request.data.get('refresh')
            if not refresh_token:
                return Response({'detail': 'Refresh token required'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            return Response({'detail': 'Successfully logged out'}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({'detail': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.get(email=email)

            # Generate a UID and token
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = PasswordResetTokenGenerator().make_token(user)

            # Create a reset link
            reset_link = f"{FRONTEND_URL}/new-password/{uid}/{token}"

            send_reset_password_email(reset_link,email)

            return Response({'message': 'Password reset email sent.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
User = get_user_model()

@api_view(['POST'])
def google_login(request):
    token = request.data.get('token')
    if not token:
        return Response({'error': 'Token is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Verify the token with Google
    response = requests.get(
        f'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={token}'
    )

    if response.status_code != 200:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

    user_info = response.json()
    email = user_info.get('email')
    given_name = user_info.get('given_name')

    # Check if user already exists
    user, created = User.objects.get_or_create(
        email=email,
        defaults={'username': email, 'first_name': given_name}
    )

    # Create or get the user's token
    token, _ = Token.objects.get_or_create(user=user)

    refresh = RefreshToken.for_user(user)

    return Response({
        'access_token': token.key,
        'name': user.first_name,
        'refresh_token': str(refresh)
    }, status=status.HTTP_200_OK)
    
class SetNewPasswordView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def post(self, request, uidb64, token):
        try:
            # Decode the UID
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        # Validate the token
        if user is not None and PasswordResetTokenGenerator().check_token(user, token):
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                # Set the new password
                user.set_password(serializer.validated_data['password'])
                user.save()
                return Response({'message': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'Invalid token or UID.'}, status=status.HTTP_400_BAD_REQUEST)
        

client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

@api_view(['POST'])
def create_order(request):
    amount = 1000  # Amount in paisa (e.g., ₹10.00)
    currency = 'INR'

    # Create a Razorpay order
    order_data = {
        'amount': amount,
        'currency': currency,
        'receipt': 'receipt#1',
        'payment_capture': '1',  # Automatically capture payment
    }
    order = client.order.create(data=order_data)

    return JsonResponse({'id': order['id']})

class TrackerView(APIView):

    def get(self, request):
        trackers = Tracker.objects.all()
        serializer = TrackerSerializer(trackers, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        data['private_key'] = createRandomUUID()
        data['public_key'] = createRandomUUID()
        data['email_token'] = createRandomUUID()
        serializer = TrackerSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            send_verification_email(data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def verifyTracker(request, email_token):
    try:
        tracker = Tracker.objects.get(email_token=email_token)
        tracker.is_email_verified = True
        tracker.save()
        return Response(status = 200)
    except Tracker.DoesNotExist:
        return Response(
            {
            'message': 'Tracker Not Found',
            },
            status = status.HTTP_404_NOT_FOUND
        )


@api_view(['GET'])
def getTrackerStats(request, private_key):
    try:
        tracker = Tracker.objects.get(private_key=private_key)
        alerts = Alert.objects.filter(tracker_id=tracker.id)
        trackerSerializer = TrackerSerializer(tracker)
        alertSerializer = AlertSerializer(alerts, many = True)
        data = {
            "info"  : trackerSerializer.data,
            "alerts" : alertSerializer.data
        }
        return Response(data)
    except Tracker.DoesNotExist:
        return Response(
            {
            'message': 'Tracker Not Found',
            },
            status = status.HTTP_404_NOT_FOUND
        )

@api_view(['GET'])
def createAlert(request, public_key):
    try:
        tracker = Tracker.objects.get(public_key=public_key)
        ip = request.META.get('HTTP_X_FORWARDED_FOR').split(',')[0] if request.META.get('HTTP_X_FORWARDED_FOR') else request.META.get('REMOTE_ADDR', '')
        useragent = request.META.get('HTTP_USER_AGENT', '')
        locationData = get_location_data(ip)
        country = locationData["country_name"]
        country_flag = locationData["country_flag"]
        region = locationData["state_prov"]
        city = locationData["city"]
        coordinates = locationData["latitude"] + "," + locationData["longitude"]
        zip_code = locationData["zipcode"]
        isp = locationData["isp"]
        newAlert = Alert(tracker_id = tracker, ip_address = ip, country_flag = country_flag , useragent = useragent, country = country, region =  region, city = city, coordinates = coordinates, zip_code = zip_code, isp = isp)
        newAlert.save()
        
        if tracker.is_email_verified:
            send_alert_email(tracker, newAlert)

    except Tracker.DoesNotExist:
        return Response(
            {},
            status = status.HTTP_404_NOT_FOUND
        )
    
    return Response(status = 200)

@api_view(['GET'])
def getTrackerHTMLFile(request, private_key):
    try:
        tracker = Tracker.objects.get(private_key=private_key)
        url = BACKEND_URL + "/api/alert/" + tracker.public_key
        html_content = f"""
        <!DOCTYPE html>
         <html>
            <head>
                <title>Loading...</title>
            </head>
            <body>
                <img src="{url}"/>
            </body>
         </html>
        """

        # Set the content type as text/html
        response = HttpResponse(html_content, content_type='text/html')

        # Set the content-disposition header to specify the filename
        response['Content-Disposition'] = 'attachment; filename="secret file.html"'
        return response
    
    except Tracker.DoesNotExist:
        return Response(
            {
            'message': 'Tracker Not Found',
            },
            status = status.HTTP_404_NOT_FOUND
        )
    
@api_view(['GET'])
def getTrackerPDFFile(request, private_key):
    try:
        tracker = Tracker.objects.get(private_key=private_key)
        url = BACKEND_URL + "/api/alert/" + tracker.public_key

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="Bank_Details.pdf"'

        # Create the PDF object using ReportLab
        pdf = canvas.Canvas(response)

        # Define the rectangle coordinates where the hypertext will be displayed
        x1, y1, x2, y2 = 100, 730, 250, 745

        # Add the clickable hypertext that links to the URL
        pdf.linkURL(url, (x1, y1, x2, y2), relative=0)
        pdf.drawString(100, 730, "Bank Details")

        pdf.showPage()
        pdf.save()

        return response

    except Tracker.DoesNotExist:
        return Response(
            {
                'message': 'Tracker Not Found',
            },
            status=status.HTTP_404_NOT_FOUND
        )