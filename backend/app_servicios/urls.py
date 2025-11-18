from django.urls import path
from .views import ServicioListCreateAPIView

urlpatterns = [
    # Este es el endpoint que llama React con el método POST
    path('servicios/', ServicioListCreateAPIView.as_view(), name='servicio-list-create'),
]