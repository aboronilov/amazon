from django.urls import path, include
from rest_framework import routers

from .views import CategoryAPIView

router = routers.SimpleRouter()
router.register('categories', CategoryAPIView, basename="categories")

app_name = 'categories'
urlpatterns = [
    path("", include(router.urls))
]