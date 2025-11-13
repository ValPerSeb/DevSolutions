import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/css.css";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, role, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/Login");
  };

  return (
    <header className="header-container">
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "#22298dff",
          padding: "15px 20px",
        }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* LOGO con texto */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img
              src="/LogoBlanco.png"
              alt="DevSolutions Logo"
              style={{
                height: "60px",
                width: "auto",
                objectFit: "contain",
              }}
            />
            <span 
              className="ms-3 text-white fw-bold"
              style={{ fontSize: "1.5rem" }}
            >
              DevSolutions
            </span>
          </Link>

          {/* Right side - Auth or User Menu */}
          <div className="ms-auto d-flex align-items-center gap-3">
            {isAuthenticated ? (
              <div className="dropdown" style={{ position: "relative" }}>
                {/* User button */}
                <button
                  className="btn btn-light d-flex align-items-center gap-2"
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{ cursor: "pointer" }}
                >
                  <span>Perfil</span>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                  </svg>
                </button>

                {/* Dropdown menu */}
                {showDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      backgroundColor: "white",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      minWidth: "200px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      zIndex: 1000,
                      marginTop: "8px",
                    }}
                  >
                    <div
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid #eee",
                        fontSize: "0.9rem",
                        color: "#666",
                      }}
                    >
                      <div style={{ fontSize: "0.85rem", color: "#999" }}>
                        {role === 'client' ? 'Cliente' : 'Freelancer'}
                      </div>
                    </div>
                    
                    <Link
                      to={role === 'client' ? "/EmpresaProfile" : "/FreelanceProfile"}
                      className="dropdown-item"
                      style={{
                        display: "block",
                        padding: "10px 16px",
                        color: "#333",
                        textDecoration: "none",
                        borderBottom: "1px solid #eee",
                      }}
                      onClick={() => setShowDropdown(false)}
                    >
                      Mi Perfil
                    </Link>

                    <button
                      onClick={handleLogout}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "10px 16px",
                        border: "none",
                        background: "none",
                        textAlign: "left",
                        color: "#d32f2f",
                        cursor: "pointer",
                        fontSize: "1rem",
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/Login" className="btn btn-light">
                  Iniciar Sesión
                </Link>
                <Link to="/Register" className="btn btn-outline-light">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Close dropdown when clicking outside */}
      {showDropdown && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={() => setShowDropdown(false)}
        />
      )}
    </header>
  );
}