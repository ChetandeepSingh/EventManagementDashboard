# users/serializers.py

from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = CustomUser
        fields = ('id', 'email', 'name', 'role', 'created_at')

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model  = CustomUser
        fields = ('email', 'name', 'password', 'role')

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
            role=validated_data.get('role', CustomUser.PARTICIPANT)
        )
        return user

class UserLoginSerializer(serializers.Serializer):
    email    = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data['email'], password=data['password'])
        if not user:

            raise serializers.ValidationError("Invalid credentials")
        if not user.is_active:
            # logger.error(f"Attempt to login inactive user {user.email}")
            raise serializers.ValidationError("User is inactive")
        data['user'] = user
        return data
