from django.contrib.auth import password_validation
from rest_framework.serializers import (
    ModelSerializer, ValidationError
)
from rest_framework.validators import UniqueValidator

from .models import (
    Company,
    Product,
)


class CompanySignupSerializer(ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'description', 'url', 'email', 'password']

        extra_kwargs = {
            'email': {
                'required': True,
                'max_length': 30,
                'validators': [
                    UniqueValidator(queryset=Company.objects.all()), ],
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
        user = Company.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            name=validated_data['name'],
            description=validated_data['description'],
            url=validated_data['url'],
            password=validated_data['password']
        )

        return user


class CompanySerializer(ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'username', 'name', 'description', 'url']


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'company', 'description', 'image', 'url']

        extra_kwargs = {
            'image': {
                'required': False
            }
        }
