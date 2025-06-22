from rest_framework import serializers
from .models import Event, RegisteredEvent

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'start_time', 'end_time', 'location', 'created_by', 'created_at']
        read_only_fields = ['id', 'created_by', 'created_at']

class RegisteredEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisteredEvent
        fields = ['id', 'event', 'user', 'registered_at']
        read_only_fields = ['id', 'user', 'registered_at']