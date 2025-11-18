// src/components/ProtectedRoute.js
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// Hook para manejar la lógica de autenticación y carga
const useAuth = () => {
    // Estado para saber si el usuario tiene un token válido
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // Estado CRUCIAL para saber si la verificación del token ha finalizado
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('access_token');
            
            // 1. Simular el tiempo que toma verificar el token con el backend (100ms)
            setTimeout(() => { 
                if (token) {
                    // Idealmente, aquí haría una llamada 'fetch' al backend para validar el token
                    // Si el token es válido:
                    setIsAuthenticated(true);
                }
                
                // 2. UNA VEZ HECHA LA VERIFICACIÓN (EXITOSA O FALLIDA), desactivar la carga.
                setIsLoading(false); 
                
            }, 100); // 100ms de espera simulada.

        };
        
        checkToken();
    }, []);

    return { isAuthenticated, isLoading };
};

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    
    // Si isLoading es true, la verificación sigue en curso. Muestra una pantalla de espera.
    if (isLoading) {
        return (
            <div style={{ padding: '50px', color: 'white', backgroundColor: '#0a0a1e', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h2>Verificando autenticación...</h2>
            </div>
        );
    }

    // Si isLoading es false y no está autenticado, redirige.
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Si isLoading es false y está autenticado, muestra el contenido.
    return children;
};

export default ProtectedRoute;