from rest_framework import serializers
from .models import Tracker, Alert
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken
import requests
from django.conf import settings

def verify_recaptcha(token):
    recaptcha_secret_key = settings.RECAPTCHA_SECRET_KEY
    url = 'https://www.google.com/recaptcha/api/siteverify'
    data = {
        'secret': recaptcha_secret_key,
        'response': token
    }
    response = requests.post(url, data=data)
    result = response.json()
    return result.get('success', False)

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    first_name = serializers.CharField(required=True)
    recaptcha = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('first_name', 'password', 'email', 'recaptcha')

    def validate(self, attrs):
        
        # Validate reCAPTCHA token
        recaptcha_token = attrs.pop('recaptcha', None)
        if not verify_recaptcha(recaptcha_token):
            raise serializers.ValidationError('Invalid reCAPTCHA. Please try again.')

        return super().validate(attrs)

    def create(self, validated_data):
        user = User.objects.create(
            first_name=validated_data['first_name'],
            username=validated_data['email'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, required=True)
    recaptcha = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'recaptcha')

    def validate(self, attrs):

        # Validate reCAPTCHA token
        recaptcha_token = attrs.pop('recaptcha', None)
        if not verify_recaptcha(recaptcha_token):
            raise serializers.ValidationError('Invalid reCAPTCHA. Please try again.')
        
        user = User.objects.filter(email=attrs['email']).first()
        if user and user.check_password(attrs['password']):
            refresh = RefreshToken.for_user(user)
            return {
                'name': user.first_name,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        else:
            raise serializers.ValidationError("Invalid credentials.")


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email does not exist.")
        return value

class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

class TrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tracker
        fields =  '__all__'
        extra_kwargs = {
                            'email_token': {'write_only': True}
                        }


class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields =  '__all__'