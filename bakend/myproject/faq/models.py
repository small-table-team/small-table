from django.db import models
from businesses.models import Business

# Create your models here.
class FAQ(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    question = models.CharField(max_length=500, blank=True, null=True)
    answer = models.CharField(max_length=1000, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.question