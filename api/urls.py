# api/urls.py
from django.urls import path
from .views import LoginView
from .views import ServicioListCreateView, ServicioRetrieveUpdateDestroyView

from .views import (
    ServicioListCreateView, 
    ServicioRetrieveUpdateDestroyView, 
    DashboardStatsView # <--- Importar la nueva vista
)

urlpatterns = [
    path('login/', LoginView.as_view(), name='api_login'),


    # Endpoint: /api/servicios/
    path('servicios/', ServicioListCreateView.as_view(), name='servicio-list-create'),
    # Endpoint: /api/servicios/<id>/
    path('servicios/<int:pk>/', ServicioRetrieveUpdateDestroyView.as_view(), name='servicio-detail'),
    
]