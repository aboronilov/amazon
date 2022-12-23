from django.db import models
from django.conf import settings
from product.models import Product
from datetime import date

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    payment_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} ordered {self.product} in qty of {self.quantity}"
