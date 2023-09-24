from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


from django.core.exceptions import PermissionDenied

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from ..api.serializers import NoteSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.throttling import UserRateThrottle

from rest_framework import generics
from ..models import AlpineVersions, KindleVersions, PostgresqlVersions, PythonVersions, RubyVersions, Business
from .serializers import AlpineVersionsSerializer, KindleVersionsSerializer, PostgresqlVersionsSerializer, PythonVersionsSerializer, RubyVersionsSerializer, BusinessSerializer
from django_ratelimit.decorators import ratelimit


class AlpineVersionsListView(generics.ListAPIView):
    queryset = AlpineVersions.objects.using('external_db').all()
    serializer_class = AlpineVersionsSerializer

class KindleVersionsListView(generics.ListAPIView):
    queryset = KindleVersions.objects.using('external_db').all()
    serializer_class = KindleVersionsSerializer

class PostgresqlVersionsListView(generics.ListAPIView):
    queryset = PostgresqlVersions.objects.using('external_db').all()
    serializer_class = PostgresqlVersionsSerializer

class PythonVersionsListView(generics.ListAPIView):
    queryset = PythonVersions.objects.using('external_db').all()
    serializer_class = PythonVersionsSerializer

class RubyVersionsListView(generics.ListAPIView):
    queryset = RubyVersions.objects.using('external_db').all()
    serializer_class = RubyVersionsSerializer



@api_view(['GET'])
def business(request):
    if request.method == 'GET':
        queryset = Business.objects.using('Users').all()
        serializer = BusinessSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        raise PermissionDenied(detail='Rate limit exceeded')


@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')  # New field
        email = request.data.get('email')
        first_name = request.data.get('first_name')


        if username and password and password == confirm_password:  # Check if passwords match
            if User.objects.filter(username=username).exists():
                return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

            user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name,
                                            )

            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Invalid registration data'}, status=status.HTTP_400_BAD_REQUEST)



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)
