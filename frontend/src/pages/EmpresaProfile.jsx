import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/EmpresaProfile.css";

export default function EmpresaProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [empresa, setEmpresa] = useState({
    clientId: 1,
    userId: 1,
    company: "TechSolutions Corp",
    industry: "Tecnología y Software",
    language: "Español, Inglés"
  });

  const [formData, setFormData] = useState({ ...empresa });

  const handleEditToggle = () => {
    if (isEditing) {
      setFormData({ ...empresa });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setEmpresa({ ...formData });
    setIsEditing(false);
    alert('Información de empresa actualizada correctamente');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="empresa-profile-container">
      <div className="container py-5">
        {/* Header */}
        <div className="profile-header text-center mb-5">
          <div className="profile-avatar mb-3">
          </div>
          <h1 className="fw-bold" style={{color: '#22298d'}}>Perfil de Empresa</h1>
          <p className="lead text-muted">Gestiona la información de tu empresa y publica ofertas</p>
        </div>

        <div className="row">
          {/* Columna izquierda - Información de la empresa */}
          <div className="col-lg-8">
            <div className="profile-card card border-0 shadow-sm mb-4">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Información de la Empresa</h5>
                <button 
                  className={`btn btn-sm ${isEditing ? 'btn-warning' : 'btn-light'}`}
                  onClick={handleEditToggle}
                >
                  {isEditing ? 'Cancelar' : 'Editar Información'}
                </button>
              </div>
              <div className="card-body p-4">
                {/* Nombre de la empresa */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Nombre de la Empresa</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Nombre de tu empresa"
                    />
                  ) : (
                    <p className="profile-display-text">{empresa.company}</p>
                  )}
                </div>

                {/* Industria */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Industria</label>
                  {isEditing ? (
                    <select
                      className="form-control"
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                    >
                      <option value="Tecnología y Software">Tecnología y Software</option>
                      <option value="Marketing Digital">Marketing Digital</option>
                      <option value="Diseño y Creatividad">Diseño y Creatividad</option>
                      <option value="Consultoría">Consultoría</option>
                      <option value="Educación">Educación</option>
                      <option value="Salud">Salud</option>
                      <option value="Finanzas">Finanzas</option>
                      <option value="Otro">Otro</option>
                    </select>
                  ) : (
                    <p className="profile-display-text">{empresa.industry}</p>
                  )}
                </div>

                {/* Idiomas */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Idiomas de la Empresa</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={formData.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      placeholder="Ej: Español, Inglés, Francés..."
                    />
                  ) : (
                    <p className="profile-display-text">{empresa.language}</p>
                  )}
                </div>

                {/* Botón Guardar cuando está editando */}
                {isEditing && (
                  <div className="text-end">
                    <button 
                      className="btn btn-success btn-lg"
                      onClick={handleSave}
                    >
                      Guardar Cambios
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna derecha - Acciones rápidas */}
          <div className="col-lg-4">
            {/* Acciones rápidas */}
            <div className="actions-card card border-0 shadow-sm mb-4">
  <div className="card-header empresa-card-header">
    <h6 className="mb-0">Acciones Rápidas</h6>
  </div>
  <div className="card-body text-center">
    <div className="d-grid gap-3">
      <button 
        className="btn btn-empresa-primary btn-lg"
        onClick={() => window.location.href = '/CrearOferta'}
      >
        <i className="bi bi-plus-circle me-2"></i>
        Crear Oferta
      </button>
      
      <button 
        className="btn btn-empresa-outline btn-lg"
        onClick={() => window.location.href = '/Contratos'}
      >
        <i className="bi bi-file-earmark-text me-2"></i>
        Ver Contratos
      </button>
    </div>
  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    ); 
}

