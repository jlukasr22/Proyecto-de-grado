// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css'; 
import logo from '../Logo.png';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; 


// --- DEFINICIONES DE COMPONENTES Y DATOS AUXILIARES ---

const Icon = ({ name }) => {
    return <i className={name}></i>;
};

// --- DATOS DEL DASHBOARD ---
const summaryData = [
    { icon: 'fas fa-user-friends', title: 'Clientes', value: '287', color: '#00bfff' },
    { icon: 'fas fa-tools', title: 'Servicios', value: '50', color: '#32cd32' },
    { icon: 'fas fa-dollar-sign', title: 'Faturamento Total', value: 'R$ 143.500', color: '#ffd700' },
    { icon: 'fas fa-barcode', title: 'Boleto Bancário', value: 'R$ 72.500', color: '#ff4500' },
    { icon: 'fas fa-credit-card', title: 'Cartão de Crédito', value: 'R$ 23.000', color: '#ff8c00' },
];

const monthlyData = [
    { month: 'jan', value: 15000 }, { month: 'fev', value: 10500 }, { month: 'mar', value: 11500 },
    { month: 'abr', value: 9000 }, { month: 'mai', value: 16500 }, { month: 'jun', value: 9500 },
    { month: 'jul', value: 11500 }, { month: 'ago', value: 9500 }, { month: 'sep', value: 10500 },
    { month: 'out', value: 9000 }, { month: 'nov', value: 16000 }, { month: 'dez', value: 15000 },
];

const regionData = [
    { region: 'Sudeste', value: 46000 }, { region: 'Norte', value: 42000 }, { region: 'Nordeste', value: 35500 },
    { region: 'Sul', value: 11000 }, { region: 'Centro-Oeste', value: 10000 },
];

const sellerData = [
    { name: 'Gabriel Cajado', value: 18000 }, { name: 'João Martins', value: 18500 }, { name: 'Diogo Amorim', value: 22000 },
    { name: 'Marcus Cavalcanti', value: 25000 }, { name: 'Paulo Lira', value: 25500 }, { name: 'Alan Pinheiro', value: 34500 },
];

const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'fas fa-chart-line' },
    { name: 'Gestión de Servicios', path: '/servicios', icon: 'fas fa-tools' }, 
    { name: 'Gestión de Clientes', path: '/clientes', icon: 'fas fa-users' },
    { name: 'Inventario', path: '/inventario', icon: 'fas fa-warehouse' },
];


const SummaryCard = ({ data }) => (
    <div className="summary-card" style={{ '--card-color': data.color }}>
        <Icon name={data.icon} />
        <div className="summary-info">
            <span className="summary-value">{data.value}</span>
            <span className="summary-title">{data.title}</span>
        </div>
    </div>
);

const RechartsMonthlyChart = ({ data }) => (
    <div className="chart-container monthly-sales-chart">
        <div className="chart-header">
            <Icon name="fas fa-chart-line" />
            <h2>Faturamento por Mês</h2>
        </div>
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.7)" />
                <YAxis hide={true} domain={[8000, 17000]} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(10, 10, 30, 0.8)', border: 'none', color: '#fff' }} formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Faturamento']} />
                <Line type="monotone" dataKey="value" stroke="#00BFFF" strokeWidth={2} dot={{ fill: '#00BFFF', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

const RechartsRegionChart = ({ data }) => (
    <div className="chart-container bar-chart-region">
        <div className="chart-header">
            <Icon name="fas fa-map-marked-alt" />
            <h2>Faturamento por Región</h2>
        </div>
        <ResponsiveContainer width="100%" height={250}>
            <BarChart
                data={[...data].sort((a, b) => b.value - a.value)} 
                layout="vertical"
                margin={{ top: 20, right: 50, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis type="number" hide={true} domain={[0, 50000]} />
                <YAxis dataKey="region" type="category" stroke="rgba(255, 255, 255, 0.7)" width={100} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(10, 10, 30, 0.8)', border: 'none', color: '#fff' }} formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Faturamento']} />
                <Bar dataKey="value" fill="#00BFFF" radius={[0, 4, 4, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

const RechartsSellerChart = ({ data }) => (
    <div className="chart-container bar-chart-seller">
        <div className="chart-header">
            <Icon name="fas fa-user-tie" />
            <h2>Faturamento por Vendedor</h2>
        </div>
        <ResponsiveContainer width="100%" height={250}>
            <BarChart
                data={[...data].sort((a, b) => a.value - b.value)}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.7)" tickFormatter={(name) => name.split(' ')[0]} />
                <YAxis hide={true} domain={[15000, 36000]} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(10, 10, 30, 0.8)', border: 'none', color: '#fff' }} formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Faturamento']} />
                <Bar dataKey="value" fill="#00BFFF" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </div>
);


// Componente de la Barra Lateral (Sidebar)
const Sidebar = ({ isOpen, onNavigate, currentPath }) => (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
            <img src={logo} alt="systemJAITECH Logo" className="sidebar-logo" />
        </div>
        <nav className="sidebar-nav">
            {menuItems.map((item) => (
                <div 
                    key={item.name} 
                    className={`menu-item ${currentPath === item.path ? 'active' : ''}`}
                    onClick={() => {
                        if (currentPath !== item.path) {
                            onNavigate(item.path);
                        }
                    }}
                >
                    <i className={item.icon}></i>
                    <span>{item.name}</span>
                </div>
            ))}
        </nav>
    </aside>
);

// Componente para la tabla de Servicios (Listado Rápido en el Dashboard)
const ServiceTableDisplay = ({ navigate }) => {
    const [serviceList, setServiceList] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = 'http://localhost:8000/api/servicios/'; // Apuntando a Django

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setServiceList(data);
            } catch (error) {
                console.error("Error al obtener servicios:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    // Estilos internos
    const crudListContainerStyle = {marginTop: '30px', padding: '20px', backgroundColor: 'rgba(10, 10, 30, 0.4)', borderRadius: '10px', border: '1px solid rgba(0, 191, 255, 0.2)', boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)'};
    const tableStyle = {width: '100%', borderCollapse: 'collapse', marginTop: '15px'};
    const thStyle = {backgroundColor: '#00bfff', color: '#0a0a1e', padding: '10px', textAlign: 'left', fontSize: '0.9em'};
    const tdStyle = {padding: '10px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', verticalAlign: 'middle', fontSize: '0.85em'};
    const editButtonStyle = {backgroundColor: '#ffd700', color: '#0a0a1e', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', transition: 'opacity 0.2s'};


    if (loading) {
        return <div style={{ color: 'white', padding: '20px' }}>Cargando Servicios...</div>;
    }
    if (serviceList.length === 0) {
        return <div style={{ color: 'white', padding: '20px' }}>No hay servicios registrados.</div>;
    }

    return (
        <div className="service-crud-list-container" style={crudListContainerStyle}>
            <h2 style={{ color: '#00bfff', borderBottom: '1px solid #00bfff33', paddingBottom: '10px' }}>
                <i className="fas fa-list-alt"></i> Listado Rápido de Servicios
            </h2>
            
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Nombre</th>
                        <th style={thStyle}>Precio</th>
                        <th style={thStyle}>Descripción</th>
                        <th style={thStyle}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceList.map(s => (
                        <tr key={s.id}>
                            <td style={tdStyle}>{s.id}</td>
                            <td style={tdStyle}>{s.nombre}</td>
                            <td style={tdStyle}>R$ {parseFloat(s.precio).toFixed(2)}</td>
                            <td style={tdStyle}>{s.descripcion ? s.descripcion.substring(0, 40) + '...' : 'N/A'}</td>
                            <td style={tdStyle}>
                                {/* Redirige a la página de CRUD completa */}
                                <button 
                                    onClick={() => navigate('/servicios')} 
                                    style={editButtonStyle}>
                                    <i className="fas fa-edit"></i> Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL Dashboard ---
const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="dashboard-page">
            
            <Sidebar 
                isOpen={isSidebarOpen} 
                onNavigate={navigate} 
                currentPath={location.pathname} 
            />

            <div className="dashboard-content-wrapper">
                
                <nav className="top-nav">
                    
                    <button onClick={toggleSidebar} className="sidebar-toggle-button">
                        <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                    
                    <h1 className="welcome-title">Dashboard</h1> 
                    
                    <button onClick={handleLogout} className="logout-button">
                        <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                    </button>
                </nav>

                {/* Contenido Principal Scrollable */}
                <main className="dashboard-main scrollable-content">
                    
                    {/* 1. Tarjetas de Resumen */}
                    <div className="summary-cards-container">
                        {summaryData.map(data => (
                            <SummaryCard key={data.title} data={data} />
                        ))}
                    </div>

                    {/* 2. Gráfico de Líneas */}
                    <RechartsMonthlyChart data={monthlyData} />

                    {/* 3. Contenedor de Gráficos Inferior */}
                    <div className="bottom-charts-grid">
                        <RechartsRegionChart data={regionData} />
                        <RechartsSellerChart data={sellerData} />
                    </div>
                    
                    {/* 4. Listado de Servicios (Integrado) */}
                    <ServiceTableDisplay navigate={navigate} />

                    <div style={{height: '50px'}}></div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;