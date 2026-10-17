import hmac

from django.conf import settings
from rest_framework.permissions import BasePermission


class HasAPIKey(BasePermission):
    """Allow the request only if the X-API-Key header matches ENV_DATA_API_KEY."""

    def has_permission(self, request, view):
        expected = settings.ENV_DATA_API_KEY
        provided = request.headers.get('X-API-Key', '')
        # An empty key in the configuration blocks every request
        return bool(expected) and hmac.compare_digest(provided, expected)
