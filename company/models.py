from django.db import models
from django.contrib.auth.models import User


class Company(User):
    description = models.TextField()
    image = models.ImageField()
    url = models.URLField()


class Product(models.Model):
    name = models.CharField(max_length=30)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    description = models.TextField()
    image = models.ImageField()
    url = models.URLField()
