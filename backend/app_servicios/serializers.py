from rest_framework import serializers
from .models import Servicio

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        # fields permite al serializador manejar la creación y actualización
        fields = ['id', 'nombre', 'descripcion', 'precio_base', 'imagen', 'activo']