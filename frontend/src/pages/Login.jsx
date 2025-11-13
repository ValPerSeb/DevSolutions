import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from "react-router-dom";
import '../assets/Login.css';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    credential: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.credential || !form.password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      const res = await login(form.credential, form.password);
      if (res.role === 'freelance') {
        navigate("/FreelanceProfile");
      } else if (res.role === 'client') {
        navigate("/EmpresaProfile");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.status === 401) {
        setError("Usuario/email o contraseña incorrectos.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Error al conectar con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login-page">
      <div className="container">
        <div className="row justify-content-center align-items-center login-container">
          
          {/* Formulario Centrado */}
          <div className="col-md-6 col-lg-5">
            <div className="login-card">
              <div className="login-header text-center mb-4">
                <h2 className="fw-bold">Iniciar Sesión</h2>
                <p className="text-muted">Accede a tu cuenta DevSolutions</p>
              </div>
              
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="credential" className="form-label fw-semibold">Usuario o Email</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="credential"
                    name="credential"
                    value={form.credential}
                    onChange={handleChange}
                    placeholder="Ingresa tu usuario o email" 
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Ingresa tu contraseña" 
                  />
                </div>

                <div className="text-center mb-3">
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-2 fw-semibold"
                    disabled={loading}
                  >
                    {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </button>
                </div>

                <div className="text-center mb-3">
                  <Link to="/recuperar" className="text-decoration-none forgot-link">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <div className="text-center">
                  <p className="text-muted mb-2">¿No tienes cuenta?</p>
                  <Link to="/Register" className="btn btn-outline-primary w-100 py-2">
                    Crear Cuenta
                  </Link>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}