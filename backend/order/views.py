from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from .serializers import OrderSerializer
from .models import Order


class OrderView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def create(self, request, *args, **kwargs):
        email = request.data.get("email")
        print(email)
