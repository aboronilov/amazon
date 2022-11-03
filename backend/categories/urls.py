from django.urls import path, include
from rest_framework import routers

from .views import CategoryAPIView, CategoryProductAPIView

router = routers.SimpleRouter()
router.register('categories', CategoryAPIView, basename="categories")
router.register('product-category', CategoryProductAPIView, basename="product_category")

app_name = 'categories'
urlpatterns = [
    path("", include(router.urls))
]