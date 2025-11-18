// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import logo from '../Logo.png'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Llamamos a nuestra API de Django
            const response = await axios.post('http://localhost:8000/api/login/', {
                username,
                password
            });
            
            // Guardamos el token y redirigimos
            localStorage.setItem('access_token', response.data.access_token);
            navigate('/');

        } catch (err) {
            if (err.response) {
                setError(err.response.data.error || 'Ocurrió un error');
            } else {
                setError('Error de conexión con el servidor');
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                
                <img src={logo} alt="systemJAITECH Logo" className="login-logo" />

                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Acceso al Sistema</h2>
                    
                    {error && <div className="message error-message">{error}</div>}

                    <div className="input-group">
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label htmlFor="username">Usuario</label>
                    </div>
                    
                    <div className="input-group">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Contraseña</label>
                    </div>
                    
                    <button type="submit" className="login-button">
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;