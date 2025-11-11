import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/Freelancer.css";

export default function Freelancer() {
  const [offers, setOffers] = useState([
    {
      offerId: 1,
      title: "Desarrollo de App Móvil React Native",
      description: "Necesitamos desarrollar una aplicación móvil para iOS y Android usando React Native. La app debe incluir autenticación de usuarios, geolocalización y integración con APIs de pago.",
      clientName: "TechSolutions Corp",
      budget: 10000000, // 10 millones COP
      duration: "3 semanas",
      skillsRequired: ["React Native", "JavaScript", "Firebase", "API Integration"],
      status: "active",
      createdAt: "2025-11-05"
    },
    {
      offerId: 2,
      title: "Diseño UI/UX para Plataforma E-commerce",
      description: "Buscamos diseñador para crear la experiencia de usuario completa de nuestra plataforma de e-commerce. Debe incluir wireframes, prototipos y diseño final responsive.",
      clientName: "MarketPlace Pro",
      budget: 7200000, // 7.2 millones COP
      duration: "2 semanas",
      skillsRequired: ["Figma", "UI/UX Design", "Wireframing", "Prototyping"],
      status: "active",
      createdAt: "2025-11-03"
    },
    {
      offerId: 3,
      title: "Backend API Development with Node.js",
      description: "Desarrollo de API RESTful para sistema de gestión de contenido. Debe incluir autenticación JWT, base de datos MongoDB y documentación Swagger.",
      clientName: "ContentMaster Inc",
      budget: 12800000, // 12.8 millones COP
      duration: "4 semanas",
      skillsRequired: ["Node.js", "MongoDB", "Express", "JWT", "REST API"],
      status: "active",
      createdAt: "2025-11-01"
    },
    {
      offerId: 4,
      title: "Desarrollo Frontend con React.js",
      description: "Creación de interfaz de usuario moderna y responsive usando React.js, TypeScript y Tailwind CSS. Proyecto a largo plazo.",
      clientName: "Innovation Labs",
      budget: 8500000, // 8.5 millones COP
      duration: "5 semanas",
      skillsRequired: ["React.js", "TypeScript", "Tailwind CSS", "Redux"],
      status: "active",
      createdAt: "2025-10-28"
    },
    {
      offerId: 5,
      title: "Sistema de Gestión de Contenidos",
      description: "Desarrollo de CMS personalizado para gestión de contenido multimedia con panel de administración intuitivo.",
      clientName: "MediaCorp Colombia",
      budget: 9500000, // 9.5 millones COP
      duration: "6 semanas",
      skillsRequired: ["PHP", "MySQL", "Laravel", "JavaScript", "Bootstrap"],
      status: "active",
      createdAt: "2025-10-25"
    }
  ]);

  const [proposals, setProposals] = useState([]);

  // Función para formatear números en formato COP
  const formatCOP = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Función para formatear fechas en español
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-CO', options);
  };

  const handleSendProposal = (offerId, hourlyRate) => {
    const newProposal = {
      proposalId: proposals.length + 1,
      offerId: offerId,
      freelanceId: 1, // ID del freelancer logueado
      hourlyRate: hourlyRate,
      status: 'Sent'
    };
    
    setProposals([...proposals, newProposal]);
    
    // Actualizar oferta para mostrar que ya se envió propuesta
    setOffers(offers.map(offer => 
      offer.offerId === offerId 
        ? { ...offer, hasProposal: true }
        : offer
    ));
    
    alert(`Propuesta enviada con tarifa de ${formatCOP(hourlyRate)} por hora`);
  };

  return (
    <div className="freelancer-container">
      <div className="container py-5">
        {/* Header Section */}
        <div className="freelancer-header text-center mb-5">
          <h1 className="fw-bold" style={{color: '#22298d'}}>Oportunidades Disponibles</h1>
          <p className="lead text-muted">Encuentra proyectos que se ajusten a tus habilidades y experiencia</p>
          <div className="currency-badge">
          </div>
        </div>

        {/* Stats Bar */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="stat-card text-center p-3">
              <h3 className="fw-bold text-primary">{offers.length}</h3>
              <p className="text-muted mb-0">Ofertas Activas</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card text-center p-3">
              <h3 className="fw-bold text-success">{proposals.filter(p => p.status === 'Accepted').length}</h3>
              <p className="text-muted mb-0">Propuestas Aceptadas</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card text-center p-3">
              <h3 className="fw-bold text-warning">{proposals.filter(p => p.status === 'Sent').length}</h3>
              <p className="text-muted mb-0">Propuestas Enviadas</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card text-center p-3">
              <h3 className="fw-bold text-info">{offers.filter(o => o.budget > 8000000).length}</h3>
              <p className="text-muted mb-0">Proyectos Premium</p>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="row">
          {offers.map((offer) => (
            <div key={offer.offerId} className="col-lg-6 mb-4">
              <div className="offer-card card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  {/* Offer Header */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="card-title fw-bold text-primary mb-2">{offer.title}</h5>
                      <p className="text-muted mb-1">
                        <i className="bi bi-building me-2"></i>
                        {offer.clientName}
                      </p>
                    </div>
                    <span className="badge bg-success">Activa</span>
                  </div>

                  {/* Offer Description */}
                  <p className="card-text text-muted mb-4">{offer.description}</p>

                  {/* Skills Required */}
                  <div className="mb-3">
                    <h6 className="fw-semibold mb-2">Habilidades Requeridas:</h6>
                    <div className="skills-container">
                      {offer.skillsRequired.map((skill, index) => (
                        <span key={index} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Offer Details */}
                  <div className="offer-details row text-center mb-4">
                    <div className="col-4">
                      <div className="detail-item">
                        <h6 className="fw-bold text-primary">Presupuesto</h6>
                        <p className="mb-0 budget-amount">{formatCOP(offer.budget)}</p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="detail-item">
                        <h6 className="fw-bold text-primary">Duración</h6>
                        <p className="mb-0">{offer.duration}</p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="detail-item">
                        <h6 className="fw-bold text-primary">Publicado</h6>
                        <p className="mb-0">{formatDate(offer.createdAt)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Proposal Form */}
                  {!offer.hasProposal ? (
                    <div className="proposal-form">
                      <h6 className="fw-semibold mb-3">Enviar Propuesta</h6>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input 
                          type="number" 
                          className="form-control" 
                          placeholder="Tarifa por hora"
                          id={`rate-${offer.offerId}`}
                          min="10000"
                          max="100000"
                          step="5000"
                        />
                        <span className="input-group-text">COP/hora</span>
                        <button 
                          className="btn btn-primary"
                          onClick={() => {
                            const rateInput = document.getElementById(`rate-${offer.offerId}`);
                            const hourlyRate = parseFloat(rateInput.value);
                            if (hourlyRate && hourlyRate >= 10000) {
                              handleSendProposal(offer.offerId, hourlyRate);
                            } else {
                              alert('Por favor ingresa una tarifa válida (mínimo $10,000 COP/hora)');
                            }
                          }}
                        >
                          Enviar Propuesta
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="alert alert-success text-center mb-0">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      Propuesta enviada - Esperando respuesta
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Offers Message */}
        {offers.length === 0 && (
          <div className="text-center py-5">
            <div className="empty-state">
              <i className="bi bi-inbox display-1 text-muted mb-3"></i>
              <h4 className="text-muted">No hay ofertas disponibles</h4>
              <p className="text-muted">Vuelve más tarde para ver nuevas oportunidades</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}