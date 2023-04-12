from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class note(models.Model):
    owner=models.ForeignKey(User, on_delete=models.CASCADE)
    title=models.CharField(default="",max_length=99,blank=True,verbose_name="Title")
    body=models.TextField(default="",max_length=9999,blank=True,verbose_name="Body")
    def __str__(self):
        return self.title