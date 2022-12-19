from rest_framework import serializers

from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    cost = serializers.SerializerMethodField(help_text="Order cost")

    def get_cost(self, obj):
        return obj.product.price * obj.quantity

    class Meta:
        model = Order
        fields = "__all__"

    

    