from django.db import models
from users.models import User
from businesses.models import Business
from businesses.models import MenuItem
# Create your models here.
class EventType(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.name

class BusinessEventType(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    event_type = models.ForeignKey(EventType, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('business', 'event_type')

class Event(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    event_type = models.ForeignKey(EventType, on_delete=models.CASCADE)
    event_name = models.CharField(max_length=255, blank=True, null=True)
    event_date = models.DateTimeField(blank=True, null=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    notes = models.CharField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.event_name or f"Event {self.id}"

class EventItem(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    is_extra = models.BooleanField(default=False)
    final_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
