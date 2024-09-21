from iw_api import views
from django.urls import path

urlpatterns = [
    path('signup/', views.RegisterView.as_view(), name='signup'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('reset-password/', views.ResetPasswordView.as_view(), name='reset_password'),
    path('new-password/<uidb64>/<token>/', views.SetNewPasswordView.as_view(), name='new-password'),
    path('auth/google/', views.google_login, name='google_login'),
    path('create-order/', views.create_order, name='create-order'),
    path('tracker/verify/<str:email_token>', views.verifyTracker),
    path('tracker/<str:private_key>', views.getTrackerStats),
    path("tracker", views.TrackerView.as_view(), name = "tracker"),
    path("alert/<str:public_key>", views.createAlert, name = "alert"),
    path("download/html/<str:private_key>", views.getTrackerHTMLFile, name = "download tracking as HTML File"),
    path("download/pdf/<str:private_key>",views.getTrackerPDFFile, name="download tracker as PDF File"),
]
