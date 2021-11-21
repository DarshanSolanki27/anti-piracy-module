from django.contrib.auth import password_validation
from rest_framework.serializers import (
    ModelSerializer, ValidationError
)
from rest_framework.validators import UniqueValidator
from .models import (
    Customer, Purchase
)


class CustomerSignupSerializer(ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'email', 'password']

        extra_kwargs = {
            'email': {
                'required': True,
                'max_length': 30,
                'validators': [
                    UniqueValidator(queryset=Customer.objects.all()), ],
                'label': 'Email',
            },
            'password': {
                'max_length': 50,
                'style': {
                    'input_type': 'password'
                },
                'write_only': True,
                'label': 'Password',
            }
        }

    def validate_password(self, value):
        try:
            password_validation.validate_password(value)
        except ValidationError as err:
            raise ValidationError(err)
        return value

    def create(self, validated_data):
        user = Customer.objects.create_user(
            username=validated_data['email'], email=validated_data['email'], password=validated_data['password'])

        return user


class PurchaseSerializer(ModelSerializer):
    class Meta:
        model = Purchase
        fields = ['id', 'customer_id', 'product_id', ]

    def create(self, validated_data):
        return Purchase.objects.create(**validated_data)


class AuthenticateProduct(ModelSerializer):
    class Meta:
        model = Purchase
        fields = ['mac_id', 'product_id']

    def update(self, instance, validated_data):
        purchase = Purchase.objects.filter(
            product=validated_data.get('purchase_id'), mac_id=validated_data.get('mac_id'))

        if purchase is not None:
            if purchase.authenticated is False:
                instance.authencated = True
                instance.save()
            else:
                raise ValidationError(
                    {'Authentication Error': 'Product already authenticated'}).status_code(404)
        else:
            raise ValidationError(
                {'Purchase': "Purchase not made or invalid MAC ID"}).status_code(404)

        return instance
