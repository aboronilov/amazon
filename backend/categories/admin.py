from django.contrib import admin
from .models import Categories

class CategoriesAdmin(admin.ModelAdmin):
    prepopulated_fields = {
        'slug': ('name', )
    }


admin.site.register(Categories, CategoriesAdmin)
