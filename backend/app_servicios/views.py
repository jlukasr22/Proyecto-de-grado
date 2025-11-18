from rest_framework import generics

from rest_framework.permissions import IsAuthenticated
from .models import Servicio
from .serializers import ServicioSerializer

# Usamos ListCreateAPIView para manejar POST (Crear) y GET (Listar)
class ServicioListCreateAPIView(generics.ListCreateAPIView):
    queryset = Servicio.objects.all().order_by('nombre') 
    serializer_class = ServicioSerializer
    
    # 🚨 Es fundamental proteger este endpoint
    # Asume que tienes un sistema de token JWT y permisos
    permission_classes = [IsAuthenticated] 
    
    # NOTA: Para manejar correctamente la imagen, Django REST Framework 
    # ya sabe cómo procesar los datos 'multipart/form-data' automáticamente 
    # gracias a ModelSerializer.