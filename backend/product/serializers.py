from .models import Product, ProductImages
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        images = self.context['images']
        product = Product.objects.create(**validated_data)
        for image in images:
            ProductImages.objects.create(product=product, image=image)
        return product

    category = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()

    def get_category(self, obj):
        return obj.category.slug

    def get_images(self, obj):
        queryset = ProductImages.objects.filter(product__pk=obj.pk)
        return ProductImagesSerializer(queryset, many=True).data

    class Meta:
        model = Product
        fields = "__all__"


class ProductImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = ["image"]