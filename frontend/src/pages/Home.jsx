import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container bg-light text-dark">
      <main className="main-content">

        {/* Hero principal */}
        <section
          className="hero-section text-center py-5"
          style={{ backgroundColor: "#22298d", color: "white" }}
        >
          <div className="container">
            <h1 className="fw-bold mb-3">Conecta con Oportunidades en DevSolutions</h1>
            <p className="lead mb-4">
              Une a los mejores <strong>freelancers</strong> con empresas que buscan talento en
              desarrollo, diseño y tecnología. Regístrate, crea tu perfil y comienza a trabajar en proyectos reales.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/Freelancer" className="btn btn-light fw-semibold px-4">
                Soy Freelancer
              </Link>
              <Link to="/EmpresaProfile" className="btn btn-outline-light fw-semibold px-4">
                Soy Empresa
              </Link>
              <Link to="/FreelanceProfile" className="btn btn-outline-light fw-semibold px-4">
                Perfil Freelancer "Provisional"
              </Link>
            </div>
          </div>
        </section>

        {/* Sección de áreas o categorías */}
        <section className="section py-5">
          <div className="container text-center">
            <h2 className="fw-bold mb-4" style={{ color: "#22298d" }}>
              Áreas de trabajo
            </h2>
            <p className="text-muted mb-5">
              Explora las categorías más demandadas y encuentra el proyecto ideal para ti.
            </p>

            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/906/906324.png"
                    alt="Desarrollo Web"
                    className="card-img-top p-4"
                    style={{ height: "160px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold" style={{ color: "#22298d" }}>
                      Desarrollo Web
                    </h5>
                    <p className="card-text text-muted">
                      Encuentra proyectos de frontend, backend y full-stack. Usa tus habilidades para construir el futuro digital.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2920/2920244.png"
                    alt="Diseño UI/UX"
                    className="card-img-top p-4"
                    style={{ height: "160px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold" style={{ color: "#22298d" }}>
                      Diseño UI/UX
                    </h5>
                    <p className="card-text text-muted">
                      Transforma ideas en experiencias visuales impactantes. Colabora con empresas que valoran el diseño.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3616/3616770.png"
                    alt="Marketing Digital"
                    className="card-img-top p-4"
                    style={{ height: "160px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold" style={{ color: "#22298d" }}>
                      Marketing Digital
                    </h5>
                    <p className="card-text text-muted">
                      Conecta marcas con sus audiencias. Especialízate en redes, SEO o estrategias publicitarias efectivas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
