import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/FreelanceProfile.css";
import { useAuth } from '../context/AuthContext';
import { getFreelanceProfile, updateFreelanceProfile } from '../services/freelanceService';
import { Link } from "react-router-dom";

export default function FreelanceProfile() {
  const { profile: freelanceId, token, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState(null);

  /**
   * Fetch freelance profile on component mount
   */
  useEffect(() => {
    if (!authLoading && freelanceId && token) {
      fetchProfile();
    } else if (!authLoading && !freelanceId) {
      setError('No se encontró el ID de freelancer. Por favor, inicia sesión nuevamente.');
      setLoading(false);
    }
  }, [freelanceId, token, authLoading]);

  /**
   * Fetch freelance profile data from API
   */
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFreelanceProfile(freelanceId);
      setProfile(data);
      setFormData({ ...data });
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err.response?.data?.error || 'Error al cargar el perfil. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setFormData({ ...profile });
      setSuccessMessage('');
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      await updateFreelanceProfile(freelanceId, formData);
      setIsEditing(false);
      setSuccessMessage('¡Perfil actualizado correctamente!');
      fetchProfile();
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.error || 'Error al actualizar el perfil. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
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
      <div className="container py-4">
        {/* Header más compacto */}
        <div className="profile-header text-center mb-4">
          <h1 className="fw-bold" style={{color: '#22298d', fontSize: '2.2rem'}}>Mi Perfil Freelancer</h1>
          <p className="lead text-muted" style={{fontSize: '1.1rem'}}>Gestiona tu información profesional y destaca tus habilidades</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-9">
              <div className="text-center p-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3 text-muted">Cargando tu perfil...</p>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-9">
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error:</strong> {error}
                <button type="button" className="btn-close" onClick={() => setError(null)}></button>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-9">
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {successMessage}
                <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
              </div>
            </div>
          </div>
        )}

        {/* Content State */}
        {!loading && profile && (
          <div className="row justify-content-center">
            {/* Información principal - Más ancha */}
            <div className="col-lg-10 col-xl-9">
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
                        value={formData?.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Ej: Desarrollador Full Stack Senior"
                      />
                    ) : (
                      <p className="profile-display-text">{profile?.title || 'No especificado'}</p>
                    )}
                  </div>

                  {/* Perfil/Descripción */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Descripción Profesional</label>
                    {isEditing ? (
                      <textarea
                        className="form-control"
                        rows="4"
                        value={formData?.profile || ''}
                        onChange={(e) => handleInputChange('profile', e.target.value)}
                        placeholder="Describe tu experiencia, especialidades y enfoque profesional..."
                      />
                    ) : (
                      <p className="profile-display-text">{profile?.profile || 'No especificado'}</p>
                    )}
                  </div>

                  {/* Habilidades */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Habilidades Técnicas</label>
                    {isEditing ? (
                      <textarea
                        className="form-control"
                        rows="3"
                        value={formData?.skills || ''}
                        onChange={(e) => handleInputChange('skills', e.target.value)}
                        placeholder="Separa cada habilidad con comas. Ej: React, Node.js, MongoDB..."
                      />
                    ) : (
                      <div className="skills-display">
                        {profile?.skills ? (
                          profile.skills.split(',').map((skill, index) => (
                            <span key={index} className="skill-badge">
                              {skill.trim()}
                            </span>
                          ))
                        ) : (
                          <p className="text-muted">No especificado</p>
                        )}
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
                        value={formData?.languages || ''}
                        onChange={(e) => handleInputChange('languages', e.target.value)}
                        placeholder="Ej: Español (Nativo), Inglés (Avanzado), Francés (Básico)..."
                      />
                    ) : (
                      <div className="skills-display">
                        {profile?.languages ? (
                          profile.languages.split(',').map((language, index) => (
                            <span key={index} className="skill-badge">
                              {language.trim()}
                            </span>
                          ))
                        ) : (
                          <p className="text-muted">No especificado</p>
                        )}
                      </div>
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
                          value={formData?.hourlyRate || 0}
                          onChange={(e) => handleInputChange('hourlyRate', parseInt(e.target.value) || 0)}
                          min="10000"
                          max="200000"
                          step="5000"
                        />
                        <span className="input-group-text">COP/h</span>
                      </div>
                    ) : (
                      <p className="profile-display-text">
                        {profile?.hourlyRate ? formatCOP(profile.hourlyRate) + ' por hora' : 'No especificado'}
                      </p>
                    )}
                  </div>

                  {/* Botón Guardar cuando está editando */}
                  {isEditing && (
                    <div className="text-end">
                      <button 
                        className="btn btn-success btn-lg"
                        onClick={handleSave}
                        disabled={loading}
                      >
                        {loading ? 'Guardando...' : 'Guardar Cambios'}
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
                    <Link to="/Contratos" className="btn btn-outline-primary btn-action">
                      Mis Contratos
                    </Link>
                    <Link to="/FreelanceOffers" className="btn btn-outline-success btn-action">
                      Explorar ofertas
                    </Link>
                    <Link to="/FreelanceOffers" className="btn btn-outline-info btn-action">
                      Mi cuenta
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}