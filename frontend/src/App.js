// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute'; 

import Dashboard from './components/Dashboard'; // El de los gráficos
import GestionServicios from './components/GestionServicios'; // El del CRUD
import GestionClientes from './components/GestionClientes'; 
import Inventario from './components/Inventario'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Ruta Protegida: Dashboard (Gráficos) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Ruta Protegida: Gestión de Servicios (CRUD) */}
        <Route 
          path="/servicios" 
          element={
            <ProtectedRoute>
              <GestionServicios /> 
            </ProtectedRoute>
          } 
        />
        
        {/* ... (Otras rutas) ... */}
        
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;