from django.db import models
from django.contrib.auth.models import User

import sys
sys.path.append("..")
from company.models import Product  # noqa: E402


class Customer(User):
    pass


class Purchase(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    mac_id = models.CharField(max_length=17)
    date_of_purchase = models.DateField(auto_now_add=True)
    authenticated = models.BooleanField(default=False)

    class Meta:
        ordering = ['-date_of_purchase']
