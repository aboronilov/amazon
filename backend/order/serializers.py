from rest_framework import serializers

from .models import Order
from product.models import ProductImages
from product.serializers import ProductImagesSerializer


class OrderSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()
    slug = serializers.SerializerMethodField()

    def get_image(self, obj):
        queryset = ProductImages.objects.filter(product__pk=obj.product.pk)
        images = ProductImagesSerializer(queryset, many=True).data
        return images[0]["image"]

    def get_title(self, obj):
        return obj.product.title

    def get_description(self, obj):
        return obj.product.description

    def get_price(self, obj):
        return obj.product.price

    def get_rating(self, obj):
        return obj.product.rating

    def get_slug(self, obj):
        return obj.product.slug
    

    class Meta:
        model = Order
        fields = "__all__"

    

    