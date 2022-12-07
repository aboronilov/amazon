from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from .models import Product, ProductImages
from .serializers import ProductSerializer, ProductImagesSerializer


class ProductAPIView(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "slug"

    def create(self, request, *args, **kwargs):
        images = request.FILES.getlist('images', None)
        _serializer = self.serializer_class(context={'images': images})
        if _serializer.is_valid():
            _serializer.save()
            return Response(data=_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["get"])
    def similar(self, request, *args, **kwargs):
        slug = kwargs.get("slug")
        current_product = Product.objects.filter(slug=slug).first()
        current_category = current_product.category
        similar_products = Product.objects.filter(category=current_category).exclude(pk=current_product.pk)
        serialazer = self.serializer_class(similar_products, many=True)
        return Response(data=serialazer.data, status=status.HTTP_200_OK)      
