import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; 
// ... imports de Recharts ...

const Icon = ({ name }) => {
    return <i className={name}></i>;
};

const DashboardGraphs = () => {
    const navigate = useNavigate();
    
    // 1. Estado para guardar los números reales
    const [stats, setStats] = useState({
        total_servicios: 0,
        total_clientes: 0
    });

    // 2. Cargar datos del Backend al iniciar
    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Asegúrate que el puerto sea 8000 (Django)
                const response = await fetch('http://localhost:8000/api/dashboard-stats/');
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Error cargando estadísticas:", error);
            }
        };
        fetchStats();
    }, []);

    // 3. Usar los datos del estado en las tarjetas
    // (Ya no usamos la variable fija 'summaryData' fuera del componente, la definimos aquí o la mapeamos directo)
    
    const cardsData = [
        { 
            icon: 'fas fa-user-friends', 
            title: 'Clientes', 
            value: stats.total_clientes, // <--- DATO REAL
            color: '#00bfff' 
        },
        { 
            icon: 'fas fa-tools', 
            title: 'Servicios', 
            value: stats.total_servicios, // <--- DATO REAL
            color: '#32cd32' 
        },
        { icon: 'fas fa-dollar-sign', title: 'Faturamento Total', value: 'R$ 143.500', color: '#ffd700' },
        { icon: 'fas fa-barcode', title: 'Boleto Bancário', value: 'R$ 72.500', color: '#ff4500' },
        { icon: 'fas fa-credit-card', title: 'Cartão de Crédito', value: 'R$ 23.000', color: '#ff8c00' },
    ];

    return (
        <>
            {/* 1. Tarjetas de Resumen con Datos Reales */}
            <div className="summary-cards-container">
                {cardsData.map((data, index) => (
                    <div key={index} className="summary-card" style={{ '--card-color': data.color }}>
                        <Icon name={data.icon} />
                        <div className="summary-info">
                            <span className="summary-value">{data.value}</span>
                            <span className="summary-title">{data.title}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ... (Resto de tus gráficos y tablas) ... */}
            <div className="bottom-charts-grid">
                 {/* Aquí irían tus componentes <Recharts...> */}
                 <div style={{color:'white', padding:'20px'}}>Gráficos aquí...</div>
            </div>
        </>
    );
};

export default DashboardGraphs;