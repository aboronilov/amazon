from rest_framework import viewsets, mixins
from rest_framework.response import Response

from .serializers import CategoriesSerializer
from .models import Categories

class CategoryAPIView(viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
    lookup_field = "slug"