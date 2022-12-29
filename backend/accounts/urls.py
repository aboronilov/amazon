from django.urls import path, include
from .views import RegisterView, RetrieveUserView, AllUsers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

app_name = 'accounts'
urlpatterns = [
    path('users/register/', RegisterView.as_view()),
    path('users/me/', RetrieveUserView.as_view()),
    path('users/all/', AllUsers.as_view()),
    path('auth/token/', TokenObtainPairView.as_view()),
    path('auth/token/refresh/', TokenRefreshView.as_view()),
    path('auth/token/verify/', TokenVerifyView.as_view()),
]