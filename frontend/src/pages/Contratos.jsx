import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/Contratos.css";

export default function Contratos() {
  const [contratos, setContratos] = useState([
    {
      contractId: 1,
      freelanceName: "Carlos Rodríguez",
      title: "Desarrollo App Móvil",
      description: "Desarrollo de aplicación móvil para gestión de proyectos",
      startDate: "2025-01-15",
      endDate: "2025-03-15",
      hourlyRate: 45000,
      hoursPerWeek: 30,
      status: "Activo",
      totalHours: 120,
      amountDue: 5400000
    },
    {
      contractId: 2,
      freelanceName: "Ana Martínez",
      title: "Diseño UI/UX Plataforma",
      description: "Diseño de experiencia de usuario para plataforma web",
      startDate: "2025-02-01",
      endDate: "2025-02-28",
      hourlyRate: 38000,
      hoursPerWeek: 25,
      status: "Completado",
      totalHours: 100,
      amountDue: 3800000
    },
    {
      contractId: 3,
      freelanceName: "David López",
      title: "Desarrollo Backend API",
      description: "API REST para sistema de gestión de contenido",
      startDate: "2025-03-01",
      endDate: "2025-04-15",
      hourlyRate: 52000,
      hoursPerWeek: 35,
      status: "Activo",
      totalHours: 80,
      amountDue: 4160000
    }
  ]);

  const handlePagar = (contractId) => {
    // Aquí iría la integración con el sistema de pagos
    alert(`Iniciando proceso de pago para contrato #${contractId}`);
    // Actualizar estado del contrato
    setContratos(contratos.map(contrato => 
      contrato.contractId === contractId 
        ? { ...contrato, status: "Pagado" }
        : contrato
    ));
  };

  const formatCOP = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CO');
  };

  return (
    <div className="contratos-container">
      <div className="container py-5">
        {/* Header */}
        <div className="contratos-header text-center mb-5">
          <h1 className="fw-bold" style={{color: '#22298d'}}>Gestión de Contratos</h1>
          <p className="lead text-muted">Administra y realiza pagos de tus contratos activos</p>
        </div>

        {/* Estadísticas */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="stat-card text-center p-3">
              <h3 className="fw-bold text-primary">{contratos.length}</h3>
              <p className="text-muted mb-0">Total Contratos</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card text-center p-3">
              <h3 className="fw-bold text-success">{contratos.filter(c => c.status === 'Activo').length}</h3>
              <p className="text-muted mb-0">Contratos Activos</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card text-center p-3">
              <h3 className="fw-bold text-warning">{contratos.filter(c => c.status === 'Completado').length}</h3>
              <p className="text-muted mb-0">Completados</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card text-center p-3">
              <h3 className="fw-bold text-info">
                {formatCOP(contratos.reduce((sum, contrato) => sum + contrato.amountDue, 0))}
              </h3>
              <p className="text-muted mb-0">Total Pendiente</p>
            </div>
          </div>
        </div>

        {/* Lista de Contratos */}
        <div className="row">
          {contratos.map((contrato) => (
            <div key={contrato.contractId} className="col-12 mb-4">
              <div className="contrato-card card border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    {/* Información del contrato */}
                    <div className="col-md-8">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h5 className="fw-bold text-primary mb-2">{contrato.title}</h5>
                          <p className="text-muted mb-1">
                            <strong>Freelancer:</strong> {contrato.freelanceName}
                          </p>
                        </div>
                        <span className={`badge ${contrato.status === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>
                          {contrato.status}
                        </span>
                      </div>

                      <p className="text-muted mb-3">{contrato.description}</p>

                      <div className="contrato-details row">
                        <div className="col-6 col-md-3">
                          <small className="text-muted">Inicio</small>
                          <p className="mb-0 fw-semibold">{formatDate(contrato.startDate)}</p>
                        </div>
                        <div className="col-6 col-md-3">
                          <small className="text-muted">Fin</small>
                          <p className="mb-0 fw-semibold">{formatDate(contrato.endDate)}</p>
                        </div>
                        <div className="col-6 col-md-3">
                          <small className="text-muted">Tarifa/Hora</small>
                          <p className="mb-0 fw-semibold">{formatCOP(contrato.hourlyRate)}</p>
                        </div>
                        <div className="col-6 col-md-3">
                          <small className="text-muted">Horas/Semana</small>
                          <p className="mb-0 fw-semibold">{contrato.hoursPerWeek}h</p>
                        </div>
                      </div>
                    </div>

                    {/* Acciones y pago */}
                    <div className="col-md-4 text-center">
                      <div className="pago-section">
                        <h4 className="fw-bold text-success mb-2">
                          {formatCOP(contrato.amountDue)}
                        </h4>
                        <p className="text-muted mb-3">
                          {contrato.totalHours} horas trabajadas
                        </p>
                        
                        {contrato.status === 'Activo' && (
                          <button 
                            className="btn btn-success btn-lg w-100"
                            onClick={() => handlePagar(contrato.contractId)}
                          >
                            <i className="bi bi-credit-card me-2"></i>
                            Pagar Contrato
                          </button>
                        )}
                        
                        {contrato.status === 'Completado' && (
                          <button className="btn btn-secondary btn-lg w-100" disabled>
                            Pagado
                          </button>
                        )}

                        <div className="mt-3">
                          <button className="btn btn-outline-primary btn-sm me-2">
                            Ver Detalles
                          </button>
                          <button className="btn btn-outline-secondary btn-sm">
                            Descargar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sin contratos */}
        {contratos.length === 0 && (
          <div className="text-center py-5">
            <div className="empty-state">
              <i className="bi bi-file-earmark-text display-1 text-muted mb-3"></i>
              <h4 className="text-muted">No hay contratos activos</h4>
              <p className="text-muted">Crea ofertas para empezar a trabajar con freelancers</p>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => window.location.href = '/CrearOferta'}
              >
                Crear Primera Oferta
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}