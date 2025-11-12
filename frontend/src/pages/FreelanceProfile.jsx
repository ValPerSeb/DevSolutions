import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/FreelanceProfile.css";

export default function FreelanceProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    freelanceId: 1,
    userId: 1,
    profile: "Desarrollador Full Stack con 5 años de experiencia en tecnologías modernas. Especializado en React, Node.js y bases de datos NoSQL. Apasionado por crear soluciones escalables y eficientes.",
    title: "Desarrollador Full Stack Senior",
    skills: "React, Node.js, JavaScript, TypeScript, MongoDB, Express, PostgreSQL, AWS, Docker",
    languages: "Español (Nativo), Inglés (Avanzado)",
    hourlyRate: 45000
  });

  const [formData, setFormData] = useState({ ...profile });

  const handleEditToggle = () => {
    if (isEditing) {
      setFormData({ ...profile });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setProfile({ ...formData });
    setIsEditing(false);
    alert('Perfil actualizado correctamente');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCOP = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="freelance-profile-container">
      <div className="container py-4"> {/* Reducido padding vertical */}
        {/* Header más compacto */}
        <div className="profile-header text-center mb-4"> {/* Reducido margin */}
          <h1 className="fw-bold" style={{color: '#22298d', fontSize: '2.2rem'}}>Mi Perfil Freelancer</h1>
          <p className="lead text-muted" style={{fontSize: '1.1rem'}}>Gestiona tu información profesional y destaca tus habilidades</p>
        </div>

        {/* Contenedor más ancho y centrado */}
        <div className="row justify-content-center">
          {/* Información principal - Más ancha */}
          <div className="col-lg-10 col-xl-9"> {/* Más ancho que antes */}
            <div className="profile-card card border-0 shadow-sm mb-4">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Información Profesional</h5>
                <button 
                  className={`btn btn-sm ${isEditing ? 'btn-warning' : 'btn-light'}`}
                  onClick={handleEditToggle}
                >
                  {isEditing ? 'Cancelar' : 'Editar Perfil'}
                </button>
              </div>
              <div className="card-body p-4">
                {/* Título profesional */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Título Profesional</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Ej: Desarrollador Full Stack Senior"
                    />
                  ) : (
                    <p className="profile-display-text">{profile.title}</p>
                  )}
                </div>

                {/* Perfil/Descripción */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Descripción Profesional</label>
                  {isEditing ? (
                    <textarea
                      className="form-control"
                      rows="4"
                      value={formData.profile}
                      onChange={(e) => handleInputChange('profile', e.target.value)}
                      placeholder="Describe tu experiencia, especialidades y enfoque profesional..."
                    />
                  ) : (
                    <p className="profile-display-text">{profile.profile}</p>
                  )}
                </div>

                {/* Habilidades */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Habilidades Técnicas</label>
                  {isEditing ? (
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.skills}
                      onChange={(e) => handleInputChange('skills', e.target.value)}
                      placeholder="Separa cada habilidad con comas. Ej: React, Node.js, MongoDB..."
                    />
                  ) : (
                    <div className="skills-display">
                      {profile.skills.split(', ').map((skill, index) => (
                        <span key={index} className="skill-badge">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Idiomas */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Idiomas</label>
                  {isEditing ? (
                    <textarea
                      className="form-control"
                      rows="2"
                      value={formData.languages}
                      onChange={(e) => handleInputChange('languages', e.target.value)}
                      placeholder="Ej: Español (Nativo), Inglés (Avanzado), Francés (Básico)..."
                    />
                  ) : (
                    <p className="profile-display-text">{profile.languages}</p>
                  )}
                </div>

                {/* Tarifa por hora */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Tarifa por Hora (COP)</label>
                  {isEditing ? (
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.hourlyRate}
                        onChange={(e) => handleInputChange('hourlyRate', parseInt(e.target.value))}
                        min="10000"
                        max="200000"
                        step="5000"
                      />
                      <span className="input-group-text">COP/h</span>
                    </div>
                  ) : (
                    <p className="profile-display-text rate-display">{formatCOP(profile.hourlyRate)} por hora</p>
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

            {/* Acciones rápidas */}
            <div className="quick-actions card border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <h5 className="mb-3" style={{color: '#22298d'}}>Acciones Rápidas</h5>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <button className="btn btn-outline-primary btn-action">
                    Ver Mis Propuestas
                  </button>
                  <button className="btn btn-outline-success btn-action">
                    Proyectos Activos
                  </button>
                  <button className="btn btn-outline-info btn-action">
                    Actualizar Portfolio
                  </button>
                  <button className="btn btn-outline-warning btn-action">
                    Configuración
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