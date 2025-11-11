import React from "react";
import { Link } from "react-router-dom";
import "../assets/css.css";

export default function Header() {
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

          {/* Botón Login */}
          <Link to="/Login" className="btn btn-light ms-auto">
            Iniciar Sesión
          </Link>
        </div>
      </nav>
    </header>
  );
}