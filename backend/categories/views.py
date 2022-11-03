from rest_framework import viewsets, mixins
from rest_framework.response import Response

from .serializers import CategoriesSerializer
from .models import Categories
from product.models import Product
from product.serializers import ProductSerializer

class CategoryAPIView(viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
    lookup_field = "slug"

class CategoryProductAPIView(viewsets.ViewSet):
    lookup_field = "slug"
    
    def retrieve(self, request, *args, **kwargs):
        queryset = Product.objects.all()
        slug = kwargs.get("slug")
        if slug is not None:
            queryset = Product.objects.filter(category__slug=slug)
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)
        