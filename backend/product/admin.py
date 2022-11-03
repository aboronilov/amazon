from django.contrib import admin
from .models import Product, ProductImages

class ProductImagesAdmin(admin.StackedInline):
    model = ProductImages

class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields = {
        'slug': ('title', )
    }
    inlines = [ProductImagesAdmin]


admin.site.register(Product, ProductAdmin)

