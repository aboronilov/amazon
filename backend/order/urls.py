from django.urls import path, include
from rest_framework import routers
from .views import OrderView


router = routers.SimpleRouter()
router.register("order", OrderView, basename="order")

app_name = 'order'
urlpatterns = [
    path("", include(router.urls))
]