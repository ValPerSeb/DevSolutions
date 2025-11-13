import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/EmpresaProfile.css";
import { useAuth } from '../context/AuthContext';
import { getClientProfile, updateClientProfile } from '../services/clientService';
import { Link } from "react-router-dom";

export default function EmpresaProfile() {
  const { profile: clientId, token, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState(null);

  /**
   * Fetch client profile on component mount
   */
  useEffect(() => {
    if (!authLoading && clientId && token) {
      fetchProfile();
    } else if (!authLoading && !clientId) {
      setError('No se encontró el ID de cliente. Por favor, inicia sesión nuevamente.');
      setLoading(false);
    }
  }, [clientId, token, authLoading]);

  /**
   * Fetch client profile data from API
   */
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getClientProfile(clientId);
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
      await updateClientProfile(clientId, formData);
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

  return (
    <div className="empresa-profile-container">
      <div className="container py-4">
        {/* Header */}
        <div className="profile-header text-center mb-4">
          <h1 className="fw-bold" style={{color: '#22298d', fontSize: '2.2rem'}}>Perfil de Empresa</h1>
          <p className="lead text-muted" style={{fontSize: '1.1rem'}}>Gestiona la información de tu empresa y publica ofertas</p>
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
            {/* Información principal */}
            <div className="col-lg-10 col-xl-9">
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
                        value={formData?.company || ''}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Nombre de tu empresa"
                      />
                    ) : (
                      <p className="profile-display-text">{profile?.company || 'No especificado'}</p>
                    )}
                  </div>

                  {/* Industria */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Industria</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={formData?.industry || ''}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        placeholder="Ingresa la industria de tu empresa"
                      />
                    ) : (
                      <p className="profile-display-text">{profile?.industry || 'No especificado'}</p>
                    )}
                  </div>

                  {/* Idiomas */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Idiomas de la Empresa</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={formData?.language || ''}
                        onChange={(e) => handleInputChange('language', e.target.value)}
                        placeholder="Ej: Español, Inglés, Francés..."
                      />
                    ) : (
                      <p className="profile-display-text">{profile?.language || 'No especificado'}</p>
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
                      Ver Contratos
                    </Link>
                    <Link to="/CrearOferta" className="btn btn-outline-success btn-action">
                      Crear Oferta
                    </Link>
                    <Link to="/" className="btn btn-outline-info btn-action">
                      Mi cuenta
                    </Link>
                    <Link to="/Proposals" className="btn btn-outline-secondary btn-action">
                      Ver propuestas
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

