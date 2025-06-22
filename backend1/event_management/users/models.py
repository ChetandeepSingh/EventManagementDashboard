# users/models.py

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    """
    Manager for CustomUser: handles creation of users, ensuring name and role are set.
    """
    def _create_user(self, email, password, name, role=None, **extra_fields):
        """
        Internal helper for user creation. Validates and creates the CustomUser.
        """
        if not email:
            raise ValueError(_('The Email field must be set'))
        if not name:
            raise ValueError(_('The Name field must be set'))
        email = self.normalize_email(email)
        role = role or self.model.PARTICIPANT
        user = self.model(
            email=email,
            name=name,
            role=role,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, name=None, role=None, **extra_fields):
        """
        Create a regular user (non-staff, non-superuser) with specified name and role.
        Name is mandatory and validated in _create_user.
        """
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, name, role, **extra_fields)

    def create_superuser(self, email, password, name=None, **extra_fields):
        """
        Create a superuser (staff + superuser) with organizer role.
        """
        extra_fields.setdefault('role', self.model.ORGANIZER)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('role') != self.model.ORGANIZER:
            raise ValueError(_('Superuser must have role of Organizer'))
        if not extra_fields.get('is_staff'):
            raise ValueError(_('Superuser must have is_staff=True'))
        if not extra_fields.get('is_superuser'):
            raise ValueError(_('Superuser must have is_superuser=True'))

        return self._create_user(email, password, name, extra_fields.get('role'), **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model where email is the unique identifier, including roles and timestamps.
    """
    ORGANIZER = 'organizer'
    PARTICIPANT = 'user'
    ROLE_CHOICES = [
        (ORGANIZER, _('Organizer')),
        (PARTICIPANT, _('User')),
    ]

    id = models.AutoField(primary_key=True)
    email = models.EmailField(_('Email'), unique=True)
    name = models.CharField(_('Name'), max_length=255)
    role = models.CharField(
        _('Role'),
        max_length=20,
        choices=ROLE_CHOICES,
        default=PARTICIPANT,
        help_text=_('Designates whether this user is an organizer or a regular user.')
    )
    created_at = models.DateTimeField(_('Date Joined'), default=timezone.now)

    is_active = models.BooleanField(_('Active'), default=True)
    is_staff = models.BooleanField(_('Staff Status'), default=False)

    USERNAME_FIELD = 'email'
    # Note: REQUIRED_FIELDS applies only to createsuperuser; name is validated in create_user.
    REQUIRED_FIELDS = ['name']

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"
