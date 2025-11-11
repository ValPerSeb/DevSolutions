import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";
import '../assets/Login.css';

export default function Login() {
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
              
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label fw-semibold">Usuario o Email</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="username" 
                    placeholder="Ingresa tu usuario o email" 
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="Ingresa tu contraseña" 
                  />
                </div>

                <div className="text-center mb-3">
                  <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
                    Iniciar Sesión
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