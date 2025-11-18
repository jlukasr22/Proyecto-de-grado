from django.db import models

class Servicio(models.Model):
    # ID es generado automáticamente (AutoField)
    id = models.AutoField(primary_key=True) 
    
    # Servicio (nombre)
    nombre = models.CharField(max_length=200, unique=True) 
    
    # Descripcion
    descripcion = models.TextField()
    
    # Precio
    precio_base = models.DecimalField(max_digits=10, decimal_places=2) 
    
    # Imagen (se guardará en una carpeta del servidor)
    imagen = models.ImageField(upload_to='servicios/imagenes/', null=True, blank=True) 
    
    # Campo extra para el catálogo de clientes
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

# 🚨 Ejecuta las migraciones en tu proyecto Django:
# python manage.py makemigrations app_servicios
# python manage.py migrate