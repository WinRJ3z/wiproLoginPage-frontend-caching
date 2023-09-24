from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('', views.getRoutes),
    path('notes/', views.getNotes),

    # Other URL patterns
    path('signup/', views.signup, name='signup'),



    path('alpine-versions/', views.AlpineVersionsListView.as_view(), name='alpine-versions-list'),
    path('kindle-versions/', views.KindleVersionsListView.as_view(), name='kindle-versions-list'),
    path('postgresql-versions/', views.PostgresqlVersionsListView.as_view(), name='postgresql-versions-list'),
    path('python-versions/', views.PythonVersionsListView.as_view(), name='python-versions-list'),
    path('ruby-versions/', views.RubyVersionsListView.as_view(), name='ruby-versions-list'),
    path('business/', views.business, name='business-list'),


    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]