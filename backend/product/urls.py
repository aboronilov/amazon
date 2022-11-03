from django.urls import path, include
from rest_framework import routers

from .views import ProductAPIView

router = routers.SimpleRouter()
router.register('product', ProductAPIView, basename="product")

app_name = 'product'
urlpatterns = [
    path("", include(router.urls))
]