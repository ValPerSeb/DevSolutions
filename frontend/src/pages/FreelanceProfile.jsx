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
      // Si está cancelando la edición, restaurar los datos originales
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
      <div className="container py-5">
        {/* Header */}
        <div className="profile-header text-center mb-5">
          <div className="profile-avatar mb-3">
            <div className="avatar-circle">
              <span>FS</span>
            </div>
          </div>
          <h1 className="fw-bold" style={{color: '#22298d'}}>Mi Perfil Freelancer</h1>
          <p className="lead text-muted">Gestiona tu información profesional y destaca tus habilidades</p>
        </div>

        <div className="row">
          {/* Columna izquierda - Información principal */}
          <div className="col-lg-8">
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
          </div>

          {/* Columna derecha - Estadísticas y información adicional */}
          <div className="col-lg-4">
            {/* Tarifa y estadísticas */}
            <div className="stats-card card border-0 shadow-sm mb-4">
              <div className="card-header bg-info text-white">
                <h6 className="mb-0">Mi Tarifa Actual</h6>
              </div>
              <div className="card-body text-center">
                <div className="hourly-rate-display">
                  <h3 className="fw-bold text-primary">{formatCOP(profile.hourlyRate)}</h3>
                  <p className="text-muted mb-0">por hora</p>
                </div>
              </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="stats-card card border-0 shadow-sm mb-4">
              <div className="card-header bg-success text-white">
                <h6 className="mb-0">Estadísticas</h6>
              </div>
              <div className="card-body">
                <div className="stat-item d-flex justify-content-between mb-3">
                  <span>Proyectos Completados</span>
                  <strong className="text-primary">12</strong>
                </div>
                <div className="stat-item d-flex justify-content-between mb-3">
                  <span>Clientes Satisfechos</span>
                  <strong className="text-success">10</strong>
                </div>
                <div className="stat-item d-flex justify-content-between mb-3">
                  <span>Propuestas Activas</span>
                  <strong className="text-warning">3</strong>
                </div>
                <div className="stat-item d-flex justify-content-between">
                  <span>Calificación Promedio</span>
                  <strong className="text-info">4.8/5</strong>
                </div>
              </div>
            </div>

            {/* Información de cuenta */}
            <div className="info-card card border-0 shadow-sm">
              <div className="card-header bg-secondary text-white">
                <h6 className="mb-0">Información de Cuenta</h6>
              </div>
              <div className="card-body">
                <div className="account-info">
                  <p><strong>Freelance ID:</strong> #{profile.freelanceId}</p>
                  <p><strong>Usuario ID:</strong> #{profile.userId}</p>
                  <p><strong>Miembro desde:</strong> Enero 2024</p>
                  <p><strong>Última actualización:</strong> Hoy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de acciones rápidas */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="quick-actions card border-0 shadow-sm">
              <div className="card-body text-center">
                <h5 className="mb-3">Acciones Rápidas</h5>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <button className="btn btn-outline-primary">
                    Ver Mis Propuestas
                  </button>
                  <button className="btn btn-outline-success">
                    Proyectos Activos
                  </button>
                  <button className="btn btn-outline-info">
                    Actualizar Portfolio
                  </button>
                  <button className="btn btn-outline-warning">
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