from django.urls import path

from . import views

urlpatterns = [
    path("api/login", views.LoginAPIView.as_view()),
    path("api/register", views.SignupAPIView.as_view()),
    path("api/logout", views.LogoutAPIView.as_view()),
]
