from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from .serializers import OrderSerializer
from .models import Order
from product.models import Product


class OrderView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def list(self, request):
        user = request.user
        queryset = Order.objects.filter(user=user)
        return Response(self.serializer_class(queryset, many=True).data, status=status.HTTP_200_OK)

    def create(self, request):
        user = request.user
        data = request.data
        product = Product.objects.get(title=data["item"]["title"])
        quantity=data["item"]["quantity"]
        order = Order.objects.create(
            user=user,
            product=product,
            quantity=quantity    
        )
        return Response(self.serializer_class(order).data, status=status.HTTP_201_CREATED)

