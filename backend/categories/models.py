from django.db import models


class Categories(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100)
    image = models.ImageField(upload_to='images/categories')

    def __str__(self):
        return self.slug

