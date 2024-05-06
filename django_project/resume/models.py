from django.db import models
from users.models import User
# Create your models here.

class Resume(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    job_title = models.CharField(max_length=100, null=True, blank=True)
    # insert cv and parse it using pdf2txt ?
    
    def __str__(self):
        return self.first_name + ' ' + self.last_name