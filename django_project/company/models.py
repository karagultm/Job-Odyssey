from django.db import models
from users.models import User
# Create your models here.


class Company(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    est_date = models.PositiveIntegerField()   
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    description = models.TextField()
    logo = models.ImageField(upload_to='company_logos/', default='company_logos/default.jpg')
    website = models.URLField(max_length=200)
    # company size
    
    