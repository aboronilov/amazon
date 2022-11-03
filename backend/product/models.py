from email.policy import default
from django.db import models

from categories.models import Categories


class Product(models.Model):
    title = models.TextField(verbose_name="title", null=True, blank=True)
    rating = models.IntegerField(verbose_name="rating", null=True, blank=True)
    short_title = models.CharField(verbose_name="short_title", null=True, blank=True, max_length=255)
    slug = models.SlugField(verbose_name="slug")
    price = models.DecimalField(verbose_name="price", max_digits=8, decimal_places=2)
    description = models.TextField(verbose_name="description", null=True, blank=True)
    about_items = models.TextField(verbose_name="about list of items", null=True, blank=True)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    note = models.TextField(verbose_name="note", null=True, blank=True)
    has_prime = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.category} - {self.short_title}"


class ProductImages(models.Model):
    product = models.ForeignKey(Product, related_name="product_images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/products', null=True, blank=True)
