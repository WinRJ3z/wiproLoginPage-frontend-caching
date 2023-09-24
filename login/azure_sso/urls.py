# azure_sso/urls.py

from django.urls import path
from .views import MicrosoftOAuthView, MicrosoftOAuthCallbackView

urlpatterns = [
    path('oauth/', MicrosoftOAuthView.as_view(), name='azure_oauth'),
    path('oauth/callback/', MicrosoftOAuthCallbackView.as_view(), name='azure_oauth_callback'),
]
