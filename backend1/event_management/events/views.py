from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db.models import Count

from .models import Event, RegisteredEvent
from .serializers import EventSerializer, RegisteredEventSerializer
from .permissions import IsOrganizer, IsParticipant

class EventListAPIView(APIView):
    permission_classes = [IsAuthenticated, IsParticipant]

    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)


class EventCreateAPIView(APIView):
    permission_classes = [IsAuthenticated, IsOrganizer]

    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            # link the event to the user who made it
            serializer.save(created_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventDetailAPIView(APIView):
    permission_classes = [IsAuthenticated, IsOrganizer]

    def put(self, request, pk):
        event = get_object_or_404(Event, pk=pk, created_by=request.user)
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        event = get_object_or_404(Event, pk=pk, created_by=request.user)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class RegisterEventAPIView(APIView):
    permission_classes = [IsAuthenticated, IsParticipant]

    def post(self, request, event_id):
        event = get_object_or_404(Event, pk=event_id)
        # avoid double registration
        if RegisteredEvent.objects.filter(event=event, user=request.user).exists():
            return Response({'detail': 'You already signed up!'}, status=status.HTTP_400_BAD_REQUEST)
        reg = RegisteredEvent.objects.create(event=event, user=request.user)
        serializer = RegisteredEventSerializer(reg)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrganizerEventsAPIView(APIView):
    permission_classes = [IsAuthenticated, IsOrganizer]

    def get(self, request):
        events = Event.objects.filter(created_by=request.user).annotate(user_count=Count('registrations'))
        out = []
        for evt in events:
            out.append({
                'id': evt.id,
                'name': evt.name,
                'count': evt.user_count,
            })
        return Response(out)


class UserRegisteredEventsAPIView(APIView):
    permission_classes = [IsAuthenticated, IsParticipant]

    def get(self, request):
        regs = RegisteredEvent.objects.filter(user=request.user)
        events = [r.event for r in regs]
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)