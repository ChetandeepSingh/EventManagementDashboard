# users/views.py
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    SignupSerializer,
    UserLoginSerializer,
    UserSerializer
)

class SignupAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # generate tokens
            refresh = RefreshToken.for_user(user)
            resp = {
                'message': "User created successfully",
                'refresh': str(refresh),
                'access':  str(refresh.access_token),
                'data':    UserSerializer(user).data
            }
            return Response(resp, status=status.HTTP_201_CREATED)

        return Response(
            {'message': "Signup failed", 'errors': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user    = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            resp = {
                'message': "Logged in successfully",
                'refresh': str(refresh),
                'access':  str(refresh.access_token),
                'data':    UserSerializer(user).data
            }
            return Response(resp, status=status.HTTP_200_OK)

        return Response(
            {'message': "Login failed", 'errors': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response(
                {'message': "Logout failed", 'error': "Refresh token required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            RefreshToken(refresh_token).blacklist()
            return Response(
                {'message': "Logout successful"},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'message': "Logout failed", 'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
