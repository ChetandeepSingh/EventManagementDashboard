from django.urls import path
from .views import (
    EventListAPIView,
    EventCreateAPIView,
    EventDetailAPIView,
    RegisterEventAPIView,
    OrganizerEventsAPIView,
    UserRegisteredEventsAPIView,
)

urlpatterns = [
    path('api/viewEvent/', EventListAPIView.as_view()),
    path('api/createEvent/', EventCreateAPIView.as_view()),
    path('api/event/<int:pk>/', EventDetailAPIView.as_view()),
    path('api/registerEvent/<int:event_id>/', RegisterEventAPIView.as_view()),
    path('api/organizerEvents/', OrganizerEventsAPIView.as_view()),
    path('api/userRegistrations/', UserRegisteredEventsAPIView.as_view()),
]