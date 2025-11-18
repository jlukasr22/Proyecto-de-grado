// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; 
import logo from '../Logo.png';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    };

    return (
        <div className="dashboard-page">
            <nav className="dashboard-nav">
                <img src={logo} alt="systemJAITECH Logo" className="nav-logo" />
                <button onClick={handleLogout} className="logout-button">
                    Cerrar Sesión
                </button>
            </nav>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <h1>Bienvenido a `systemJAITECH`</h1>
                    <p>Este es tu centro de mando. Desde aquí se desglosarán todos los módulos del sistema.</p>
                </header>
                
                {/* Aquí es donde "desglosarás" el sistema */}
                <div className="module-grid">
                    <div className="module-card">
                        <h3>Gestión de Clientes</h3>
                        <p>Próximamente...</p>
                    </div>
                    <div className="module-card">
                        <h3>Gestión de Servicios</h3>
                        <p>Próximamente...</p>
                    </div>
                    <div className="module-card">
                        <h3>Inventario</h3>
                        <p>Próximamente...</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;