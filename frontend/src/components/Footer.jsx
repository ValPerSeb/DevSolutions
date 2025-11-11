import React from "react";
import "../assets/Footer.css";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#22298d",
        color: "white",
        padding: "20px 10px",
        textAlign: "center",
        width: "100%",
        fontSize: "0.95rem",
      }}
    >
      <p style={{ margin: 0 }}>
        © 2025 <strong>DevSolutions</strong>. Todos los derechos reservados.
      </p>
    </footer>
  );
}