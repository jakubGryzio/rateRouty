from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.conf import settings
from datetime import datetime

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token

    def validate(self, attrs):
        credentials = {
            'username': "",
            'password': attrs.get('password')
        }
        user = User.objects.filter(email=attrs.get("username")).first() or User.objects.filter(username=attrs.get('username')).first()
        if user:
            credentials['username'] = user.username
        data = super().validate(credentials)
        data['username'] = self.user.username
        data['expiredTime'] = round((settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].seconds + datetime.now().timestamp()) * 1000)
        return data


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ('username', 'password', 'confirm_password', 'email')
        
    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Hasło powinno być takie samo."})
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        
        user.set_password(validated_data['password'])
        user.save()
        
        return user