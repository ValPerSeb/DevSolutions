import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/CrearOferta.css";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createOffer } from '../services/offerService';

export default function CrearOferta() {
  const { profile: clientId, role, token, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    hourlyRate: '',
    duration: '',
    skills: '',
    location: '',
    projectType: '',
    level: '',
    totalHours: '',
    vacancies: 1
  });

  /**
   * Redirect if not authenticated or not a client
   */
  useEffect(() => {
    if (!authLoading && (!clientId || role !== 'client')) {
      navigate('/Login');
    }
  }, [authLoading, clientId, role, navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.description || !formData.hourlyRate || !formData.duration || !formData.skills || !formData.location || !formData.projectType || !formData.level) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Prepare offer data with required backend fields
      const offerData = {
        title: formData.title,
        description: formData.description,
        skills: formData.skills,
        duration: formData.duration,
        location: formData.location,
        projectType: formData.projectType,
        level: formData.level,
        hourlyRate: parseFloat(formData.hourlyRate),
        totalHours: formData.totalHours ? parseInt(formData.totalHours) : null,
        vacancies: formData.vacancies ? parseInt(formData.vacancies) : 1,
        ownerType: 'client', // Always client
        ownerId: clientId, // Current client from auth context
        status: 'active' // Always active
      };

      await createOffer(offerData);
      
      setSuccessMessage('¡Oferta creada exitosamente!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        hourlyRate: '',
        duration: '',
        skills: '',
        location: '',
        projectType: '',
        level: '',
        totalHours: '',
        vacancies: 1
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/EmpresaProfile');
      }, 2000);
    } catch (err) {
      console.error('Error creating offer:', err);
      setError(err.response?.data?.error || 'Error al crear la oferta. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
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
    <div className="crear-oferta-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="oferta-card card border-0 shadow-sm">
              <div className="card-header bg-primary text-white">
                <h2 className="mb-0">Crear Oferta</h2>
              </div>
              <div className="card-body p-4">
                {/* Error Alert */}
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error:</strong> {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                  </div>
                )}

                {/* Success Message */}
                {successMessage && (
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {successMessage}
                    <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Título */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Título de la Oferta *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Ej: Desarrollador Full Stack React/Node.js"
                      required
                      disabled={loading}
                    />
                  </div>

                  {/* Descripción */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Descripción del Proyecto *</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe detalladamente el proyecto, objetivos, tecnologías requeridas..."
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="row">
                    {/* Tarifa por hora */}
                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">Tarifa por Hora (COP) *</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          className="form-control"
                          value={formData.hourlyRate}
                          onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                          placeholder="50000"
                          min="5000"
                          required
                          disabled={loading}
                        />
                      </div>
                      <small className="text-muted">
                        {formData.hourlyRate && `≈ ${formatCOP(parseInt(formData.hourlyRate) || 0)}`}
                      </small>
                    </div>

                    {/* Duración */}
                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">Duración *</label>
                      <select
                        className="form-control"
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        required
                        disabled={loading}
                      >
                        <option value="">Seleccionar duración</option>
                        <option value="1 semana">1 semana</option>
                        <option value="2 semanas">2 semanas</option>
                        <option value="3 semanas">3 semanas</option>
                        <option value="1 mes">1 mes</option>
                        <option value="2 meses">2 meses</option>
                        <option value="3 meses">3 meses</option>
                        <option value="6 meses">6 meses</option>
                        <option value="1 año">1 año</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    {/* Habilidades requeridas */}
                    <div className="col-md-8 mb-4">
                      <label className="form-label fw-semibold">Habilidades Requeridas *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.skills}
                        onChange={(e) => handleInputChange('skills', e.target.value)}
                        placeholder="Ej: React, Node.js, MongoDB, AWS"
                        required
                        disabled={loading}
                      />
                      <small className="text-muted">Separa las habilidades con comas</small>
                    </div>

                    {/* Horas por semana */}
                    <div className="col-md-4 mb-4">
                      <label className="form-label fw-semibold">Total de horas</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.totalHours}
                        onChange={(e) => handleInputChange('totalHours', e.target.value)}
                        placeholder="20"
                        min="5"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="row">
                    {/* Ubicación */}
                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">Ubicación *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="Ej: Bogotá, Colombia"
                        required
                        disabled={loading}
                      />
                    </div>

                    {/* Tipo de Proyecto */}
                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">Tipo de Proyecto *</label>
                      <select
                        className="form-control"
                        value={formData.projectType}
                        onChange={(e) => handleInputChange('projectType', e.target.value)}
                        required
                        disabled={loading}
                      >
                        <option value="">Seleccionar tipo</option>
                        <option value="Fixed-Price">Precio Fijo</option>
                        <option value="Hourly">Por Horas</option>
                        <option value="Long-Term">Largo Plazo</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    {/* Nivel de Experiencia */}
                    <label className="form-label fw-semibold">Nivel de Experiencia Requerido *</label>
                    <select
                      className="form-control"
                      value={formData.level}
                      onChange={(e) => handleInputChange('level', e.target.value)}
                      required
                      disabled={loading}
                    >
                      <option value="">Seleccionar nivel</option>
                      <option value="Beginner">Principiante</option>
                      <option value="Intermediate">Intermedio</option>
                      <option value="Expert">Experto</option>
                    </select>
                  </div>

                  {/* Vacancies */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Número de Vacantes</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.vacancies}
                      onChange={(e) => handleInputChange('vacancies', e.target.value)}
                      placeholder="1"
                      min="1"
                      max="10"
                      disabled={loading}
                    />
                  </div>

                  {/* Botones */}
                  <div className="d-flex justify-content-between mt-4">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => navigate('/EmpresaProfile')}
                      disabled={loading}
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-success btn-lg"
                      disabled={loading}
                    >
                      {loading ? 'Publicando...' : 'Publicar Oferta'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}