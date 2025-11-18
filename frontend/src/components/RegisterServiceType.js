import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterServiceType.css'; 

// URL del endpoint de Django para crear nuevos servicios
// ¡Asegúrate de que esta URL coincida con tu urls.py de Django!
const DJANGO_API_URL = 'http://localhost:8000/api/servicios/'; 

function RegisterServiceType() {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio_base: '',
    activo: true, 
  });
  const [imagen, setImagen] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    // Captura el archivo de imagen
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Registrando nuevo servicio...');

    // 1. Crear un objeto FormData para enviar datos mixtos (texto y archivo)
    const dataToSend = new FormData();
    dataToSend.append('nombre', formData.nombre);
    dataToSend.append('descripcion', formData.descripcion);
    dataToSend.append('precio_base', formData.precio_base);
    dataToSend.append('activo', formData.activo);

    if (imagen) {
        dataToSend.append('imagen', imagen); // Añade el archivo de imagen
    }
    
    try {
        const token = localStorage.getItem('userToken'); // Obtener el token de autenticación
        
        const response = await fetch(DJANGO_API_URL, {
            method: 'POST',
            // NO establecemos Content-Type, el navegador lo configura
            // automáticamente como 'multipart/form-data' por usar FormData.
            headers: {
                // Solo necesitamos el token de autenticación
                'Authorization': `Bearer ${token}`, 
            },
            body: dataToSend,
        });

        if (response.ok) {
            const result = await response.json();
            setMessage(`✅ Servicio registrado con ID: ${result.id}.`);
            // Limpiar formulario y redirigir
            setFormData({ nombre: '', descripcion: '', precio_base: '', activo: true });
            setImagen(null);
            setTimeout(() => navigate('/'), 3000); 

        } else {
            const errorData = await response.json();
            setMessage(`❌ Error al registrar: ${JSON.stringify(errorData)}`);
        }
    } catch (error) {
        setMessage(`❌ Error de conexión: ${error.message}`);
    }
  };

  return (
    <div className="admin-register-service-container">
      <h2>🆕 Registrar Nuevo Tipo de Servicio Tecnológico</h2>
      <p>ID, Servicio, Descripción, Precio e Imagen</p>
      <form onSubmit={handleSubmit} className="admin-service-form">
        
        {/* Campo Servicio (nombre) */}
        <div className="form-group">
          <label htmlFor="nombre">Nombre del Servicio</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>

        {/* Campo Descripción */}
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
        </div>

        {/* Campo Precio */}
        <div className="form-group">
          <label htmlFor="precio_base">Precio Base (Bs)</label>
          <input type="number" id="precio_base" name="precio_base" value={formData.precio_base} onChange={handleChange} required min="0" step="0.01"/>
        </div>

        {/* Campo Imagen */}
        <div className="form-group">
          <label htmlFor="imagen">Imagen Representativa</label>
          <input type="file" id="imagen" name="imagen" onChange={handleFileChange} accept="image/*" />
          {imagen && <small>Archivo seleccionado: {imagen.name}</small>}
        </div>

        {/* Campo Activo (para visibilidad en el catálogo) */}
        <div className="form-group checkbox-group">
            <input type="checkbox" id="activo" name="activo" checked={formData.activo} onChange={(e) => setFormData({...formData, activo: e.target.checked})} />
            <label htmlFor="activo">Disponible en el Catálogo de Clientes</label>
        </div>

        <button type="submit" className="submit-button">
          Guardar Servicio en MariaDB
        </button>
      </form>
      {message && <p className={`status-message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
}

export default RegisterServiceType;