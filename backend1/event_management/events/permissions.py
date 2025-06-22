from rest_framework.permissions import BasePermission
from users.models import CustomUser

class IsOrganizer(BasePermission):
    """Allows access only to organizer users."""
    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated and
            request.user.role == CustomUser.ORGANIZER
        )

class IsParticipant(BasePermission):
    """Allows access only to participant (regular) users."""
    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated and
            request.user.role == CustomUser.PARTICIPANT
        )