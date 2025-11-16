from django.db import models
# from users.models import User
# Create your models here.
class Business(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=500, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    kosher_type = models.CharField(max_length=255, blank=True, null=True)
    min_order_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class DishCategory(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class MenuItem(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    category = models.ForeignKey(DishCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=500, blank=True, null=True)
    base_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    kosher_type = models.CharField(max_length=255, blank=True, null=True)
    available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
class BusinessDishRule(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    category = models.ForeignKey(DishCategory, on_delete=models.CASCADE)
    min_selection = models.IntegerField(blank=True, null=True)
    max_selection = models.IntegerField(blank=True, null=True)
    extra_price_per_item = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
