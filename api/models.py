# api/models.py
from django.db import models

class Servicio(models.Model):
    nombre = models.CharField(max_length=255)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    # blank=True, null=True significa que son opcionales
    # --- CAMBIO ---
    # ImageField guarda la RUTA (string) en la BD, 
    # y sube el archivo a 'media/servicios/'
    imagen = models.ImageField(upload_to='servicios/', blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'servicios' # Usa la tabla existente en MariaDB
        #verbose_name = 'Servicio'
        #verbose_name_plural = 'Servicios'

    def __str__(self):
        return self.nombre