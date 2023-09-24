from django.shortcuts import render
# views.py
from django.shortcuts import redirect
from rest_framework.views import APIView
from requests_oauthlib import OAuth2Session
from rest_framework.response import Response
from django.conf import settings
AZURE_AD_CLIENT_ID = settings.AZURE_AD_CLIENT_ID
AZURE_AD_TENANT_ID = settings.AZURE_AD_TENANT_ID
AZURE_AD_REDIRECT_URI = settings.AZURE_AD_REDIRECT_URI
AZURE_AD_CLIENT_SECRET = settings.AZURE_AD_CLIENT_SECRET



class MicrosoftOAuthView(APIView):
    def get(self, request):
        ms_auth = OAuth2Session(
            AZURE_AD_CLIENT_ID,
            scope=['openid', 'profile', 'email'],  # Properly formatted list of scopes
            redirect_uri=AZURE_AD_REDIRECT_URI
        )
        authorization_url, _ = ms_auth.authorization_url(
            f'https://login.microsoftonline.com/{AZURE_AD_TENANT_ID}/oauth2/v2.0/authorize',
        )
        return redirect(authorization_url)


class MicrosoftOAuthCallbackView(APIView):
    def get(self, request):
        ms_auth = OAuth2Session(AZURE_AD_CLIENT_ID, redirect_uri=AZURE_AD_REDIRECT_URI)
        token_url = f'https://login.microsoftonline.com/{AZURE_AD_TENANT_ID}/oauth2/v2.0/token'
        token = ms_auth.fetch_token(
            token_url,
            authorization_response=request.build_absolute_uri(),
            client_secret=AZURE_AD_CLIENT_SECRET
        )
        access_token = token.get('access_token')

        # Save the access_token in the session or database as needed
        return Response({'access_token': access_token})
