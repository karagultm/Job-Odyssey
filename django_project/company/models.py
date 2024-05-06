from django.db import models
from users.models import User
# Create your models here.


class Company(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True, blank=True)
    est_date = models.PositiveIntegerField(null=True, blank=True)   
    city = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    logo = models.ImageField(upload_to='company_logos/', default='company_logos/default.jpg', null=True, blank=True)
    website = models.URLField(max_length=200, null=True, blank=True)
    # company size
    
    def __str__(self):
        return self.name