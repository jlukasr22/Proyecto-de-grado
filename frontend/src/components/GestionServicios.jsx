// src/components/GestionServicios.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Apuntar al backend de Django (Puerto 8000)
const API_URL = 'http://localhost:8000/api/servicios/'; 

const EMPTY_FORM = {
    nombre: '',
    descripcion: '',
    precio: '',
};

const GestionServicios = () => {
    const navigate = useNavigate();
    const [servicios, setServicios] = useState([]);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [selectedFile, setSelectedFile] = useState(null); 
    const [editingId, setEditingId] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(true); 

    // --- FUNCIONES CRUD (COMPLETAS) ---
    const fetchServicios = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_URL);
            if (response.ok) {
                const data = await response.json();
                setServicios(data);
            } else { console.error("Error del backend al cargar servicios."); }
        } catch (error) { console.error('Error de red al cargar servicios:', error); } 
        finally { setIsLoading(false); }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]); 
    };

    const handleCancelEdit = () => {
        setEditingId(null); setFormData(EMPTY_FORM); setSelectedFile(null); setIsFormVisible(false);
    };

    const handleAddClick = () => {
        setEditingId(null); setFormData(EMPTY_FORM); setSelectedFile(null); setIsFormVisible(true);
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `${API_URL}${editingId}/` : API_URL;

        if (!formData.nombre || !formData.precio) {
            alert("Nombre y Precio son requeridos.");
            setIsSubmitting(false);
            return;
        }

        const data = new FormData();
        data.append('nombre', formData.nombre);
        data.append('descripcion', formData.descripcion);
        data.append('precio', formData.precio);
        
        if (selectedFile) {
            data.append('imagen', selectedFile, selectedFile.name);
        }

        try {
            const response = await fetch(url, {
                method: method,
                body: data, 
            });
            
            if (response.ok) {
                alert(`Servicio ${editingId ? 'actualizado' : 'creado'} con éxito.`);
                setFormData(EMPTY_FORM);
                setSelectedFile(null);
                e.target.reset(); 
                setIsFormVisible(false); 
                fetchServicios(); 
            } else {
                const errorData = await response.json();
                alert(`Error al guardar: ${Object.values(errorData)[0]}`);
            }
        } catch (error) {
            alert('Error de conexión con el backend de Django.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleEdit = (servicio) => {
        setEditingId(servicio.id);
        setFormData({ 
            nombre: servicio.nombre || '',
            descripcion: servicio.descripcion || '',
            precio: String(parseFloat(servicio.precio).toFixed(2)), 
        });
        setSelectedFile(null); 
        setIsFormVisible(true); 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    };

    const handleDelete = async (id) => {
        if (!window.confirm(`¿Estás seguro de eliminar el servicio ID ${id}?`)) return;
        try {
            const response = await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
            if (response.status === 204 || response.ok) {
                alert('Servicio eliminado.');
                fetchServicios();
            } else {
                const errorData = await response.json();
                alert(`Error al eliminar: ${errorData.detail}`);
            }
        } catch (error) {
            alert('Error de conexión al eliminar.');
        }
    };
    
    useEffect(() => { fetchServicios(); }, []);
    // --- FIN LÓGICA CRUD ---

    // --- ESTILOS INLINE (Mantenidos) ---
    const pageStyle = { padding: '20px', color: 'white', backgroundColor: '#0a0a1e', minHeight: '100vh' };
    const formContainerWrapperStyle = { display: 'flex', justifyContent: 'center', position: 'relative', marginTop: '20px' };
    const formStyle = { display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', width: '100%', margin: '20px 0', padding: '15px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)' };
    const backToDashboardStyle = { backgroundColor: '#00bfff', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.2s', marginBottom: '20px' };
    const closeFormButtonStyle = { backgroundColor: 'transparent', color: '#dc3545', border: '1px solid #dc354555', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '0.9em', transition: 'background-color 0.2s' };
    const labelStyle = { color: 'white', display: 'block', marginBottom: '5px', fontWeight: 'bold' };
    const inputStyle = { padding: '8px', borderRadius: '5px', border: '1px solid #00bfff', backgroundColor: '#343a40', color: 'white' };
    const textareaStyle = { ...inputStyle, resize: 'vertical', minHeight: '60px' };
    const buttonStyle = { padding: '8px 15px', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.3s' };
    const buttonGroupStyle = { display: 'flex', gap: '10px', marginTop: '10px' };
    const tableContainerStyle = { maxHeight: '70vh', overflowY: 'auto', marginTop: '20px', padding: '10px', backgroundColor: '#343a40', borderRadius: '8px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)' };
    const tableStyle = { width: '100%', borderCollapse: 'separate', borderSpacing: '0', minWidth: '700px' };
    const thStyle = { backgroundColor: '#f8f9fa', color: '#333', padding: '10px 15px', textAlign: 'left', fontSize: '0.9em', position: 'sticky', top: 0, zIndex: 10 };
    const tdStyle = { padding: '10px 15px', borderBottom: '1px solid #495057', color: '#f8f9fa', verticalAlign: 'middle', fontSize: '0.9em' };
    const btnEditStyle = { backgroundColor: '#ffc107', color: '#333', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginRight: '5px' };
    const btnDeleteStyle = { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' };
    const controlButtonsGroupStyle = { margin: '20px 0', display: 'flex', gap: '15px', padding: '0 10px' };
    const btnDownloadCsvStyle = { padding: '10px 20px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: '#007bff', color: 'white' };
    const btnAddItemStyle = { padding: '10px 20px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: '#28a745', color: 'white' };
    // --- FIN DE ESTILOS ---

    return (
        <div className="gestion-servicios-page" style={pageStyle}>
            
            <button onClick={() => navigate('/dashboard')} style={backToDashboardStyle}>
                <i className="fas fa-arrow-left"></i> Volver al Dashboard
            </button>
            
            <div style={formContainerWrapperStyle}>
                
                {isFormVisible && (
                    <form onSubmit={handleSubmit} style={formStyle}>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <h2 style={{ color: '#00bfff', margin: 0, fontSize: '1.2em' }}>
                                {editingId ? 'Editar Servicio' : 'Registrar Nuevo Servicio'}
                            </h2>
                            <button type="button" onClick={handleCancelEdit} style={closeFormButtonStyle} title="Cerrar Formulario">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        
                        <label style={labelStyle}>Nombre del Servicio</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} style={inputStyle} required />

                        <label style={labelStyle}>Descripción</label>
                        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} style={textareaStyle}></textarea>

                        <label style={labelStyle}>Precio (Bs)</label>
                        <input type="number" name="precio" value={formData.precio} onChange={handleChange} style={inputStyle} required step="0.01" />

                        <label style={labelStyle}>Imagen Representativa</label>
                        <input type="file" name="imagen_file" onChange={handleFileChange} style={inputStyle} />
                        {selectedFile && <p style={{color: 'gray', fontSize: '0.8em'}}>Archivo seleccionado: {selectedFile.name}</p>}

                        <div style={buttonGroupStyle}>
                            <button type="submit" style={{ ...buttonStyle, backgroundColor: editingId ? '#ffc107' : '#28a745' }} disabled={isSubmitting}>
                                {isSubmitting ? 'Guardando...' : editingId ? 'Guardar Cambios' : 'Registrar Servicio'}
                            </button>
                            
                            {editingId && (
                                <button type="button" onClick={handleCancelEdit} style={{ ...buttonStyle, backgroundColor: '#dc3545' }}>
                                    Cancelar Edición
                                </button>
                            )}
                        </div>
                    </form>
                )}
            </div>

            {/* --- Botones de Control Inferiores --- */}
            <div style={controlButtonsGroupStyle}>
                <button style={btnDownloadCsvStyle}>Download CSV</button>
                <button onClick={handleAddClick} style={btnAddItemStyle}>Add Item</button>
            </div>

            {/* --- Lista de Servicios (CRUD) --- */}
            <h1 style={{ color: 'white', marginTop: '30px' }}>Servicios Registrados</h1>

            {isLoading ? (
                <p style={{textAlign: 'center', marginTop: '30px'}}>Cargando servicios...</p>
            ) : servicios.length === 0 ? (
                <p style={{textAlign: 'center', marginTop: '30px'}}>No hay servicios registrados.</p>
            ) : (
                <div style={tableContainerStyle}>
                    <table className="crud-table" style={tableStyle}>
                        <thead>
                            <tr style={{backgroundColor: '#f8f9fa'}}>
                                <th style={thStyle}>ID</th>
                                <th style={thStyle}>Nombre</th>
                                <th style={thStyle}>Precio</th>
                                <th style={thStyle}>Descripción</th>
                                <th style={thStyle}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicios.map(s => (
                                <tr key={s.id}>
                                    <td style={tdStyle}>{s.id}</td>
                                    <td style={tdStyle}>{s.nombre}</td>
                                    <td style={tdStyle}>R$ {parseFloat(s.precio).toFixed(2)}</td>
                                    <td style={tdStyle}>{s.descripcion ? s.descripcion.substring(0, 70) + '...' : 'N/A'}</td>
                                    <td style={tdStyle}>
                                        <button onClick={() => handleEdit(s)} style={btnEditStyle}>
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(s.id)} style={btnDeleteStyle}>
                                            Del
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default GestionServicios;