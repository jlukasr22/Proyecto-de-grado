# api/serializers.py
from rest_framework import serializers
from .models import Servicio

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = '__all__' # Incluye id, nombre, imagen, precio, descripcion