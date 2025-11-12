import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/CrearOferta.css";

export default function CrearOferta() {
  const [oferta, setOferta] = useState({
    title: '',
    description: '',
    budget: '',
    duration: '',
    skillsRequired: '',
    hoursPerWeek: ''
  });

  const handleInputChange = (field, value) => {
    setOferta(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la conexión con el backend
    console.log('Oferta creada:', oferta);
    alert('Oferta creada exitosamente');
    // Reset form
    setOferta({
      title: '',
      description: '',
      budget: '',
      duration: '',
      skillsRequired: '',
      hoursPerWeek: ''
    });
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
                <h2 className="mb-0">Crear Nueva Oferta</h2>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  {/* Título */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Título de la Oferta *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={oferta.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Ej: Desarrollador Full Stack React/Node.js"
                      required
                    />
                  </div>

                  {/* Descripción */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Descripción del Proyecto *</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      value={oferta.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe detalladamente el proyecto, objetivos, tecnologías requeridas..."
                      required
                    />
                  </div>

                  <div className="row">
                    {/* Presupuesto */}
                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">Presupuesto (COP) *</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          className="form-control"
                          value={oferta.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          placeholder="5000000"
                          min="1000000"
                          required
                        />
                      </div>
                      <small className="text-muted">
                        {oferta.budget && `≈ ${formatCOP(parseInt(oferta.budget) || 0)}`}
                      </small>
                    </div>

                    {/* Duración */}
                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">Duración *</label>
                      <select
                        className="form-control"
                        value={oferta.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        required
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
                        value={oferta.skillsRequired}
                        onChange={(e) => handleInputChange('skillsRequired', e.target.value)}
                        placeholder="Ej: React, Node.js, MongoDB, AWS"
                        required
                      />
                      <small className="text-muted">Separa las habilidades con comas</small>
                    </div>

                    {/* Horas por semana */}
                    <div className="col-md-4 mb-4">
                      <label className="form-label fw-semibold">Horas/Semana</label>
                      <input
                        type="number"
                        className="form-control"
                        value={oferta.hoursPerWeek}
                        onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
                        placeholder="20"
                        min="5"
                        max="40"
                      />
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="d-flex justify-content-between mt-4">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => window.history.back()}
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-success btn-lg"
                    >
                      Publicar Oferta
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