import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/Freelancer.css";
import { useAuth } from '../context/AuthContext';
import { getAllOffers } from '../services/offerService';
import { getAllProposals, createProposal } from '../services/proposalService';

export default function FreelanceOffers() {
  const { profile: freelanceId, token, loading: authLoading } = useAuth();
  const [offers, setOffers] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [submittingProposal, setSubmittingProposal] = useState(null);

  /**
   * Fetch offers and proposals on component mount
   */
  useEffect(() => {
    if (!authLoading && freelanceId && token) {
      fetchData();
    } else if (!authLoading && !freelanceId) {
      setError('No se encontró el ID de freelancer. Por favor, inicia sesión nuevamente.');
      setLoading(false);
    }
  }, [freelanceId, token, authLoading]);

  /**
   * Fetch all offers and proposals from API
   */
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [offersData, proposalsData] = await Promise.all([
        getAllOffers(),
        getAllProposals()
      ]);
      setOffers(offersData || []);
      setProposals(proposalsData || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.response?.data?.error || 'Error al cargar las ofertas. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Format currency to COP
   */
  const formatCOP = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  /**
   * Format date in Spanish
   */
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-CO', options);
  };

  /**
   * Check if freelancer has already submitted a proposal for an offer
   */
  const hasProposalForOffer = (offerId) => {
    return proposals.some(p => p.offerId === offerId && p.freelanceId === freelanceId);
  };

  /**
   * Get proposal for an offer if it exists
   */
  const getProposalForOffer = (offerId) => {
    return proposals.find(p => p.offerId === offerId && p.freelanceId === freelanceId);
  };

  /**
   * Get count of accepted proposals
   */
  const getAcceptedProposalsCount = () => {
    return proposals.filter(p => p.freelanceId === freelanceId && p.status === 'Accepted').length;
  };

  /**
   * Get count of sent proposals
   */
  const getSentProposalsCount = () => {
    return proposals.filter(p => p.freelanceId === freelanceId && p.status === 'Sent').length;
  };

  /**
   * Get count of rejected proposals
   */
  const getRejectedProposalsCount = () => {
    return proposals.filter(p => p.freelanceId === freelanceId && p.status === 'Rejected').length;
  };

  /**
   * Handle sending a proposal
   */
  const handleSendProposal = async (offerId, hourlyRate, clientId) => {
    try {
      setSubmittingProposal(offerId);
      setError(null);
      
      const newProposal = await createProposal({
        offerId,
        clientId,
        freelanceId,
        hourlyRate: parseFloat(hourlyRate),
        status: 'Sent'
      });
      
      setProposals([...proposals, newProposal]);
      setSuccessMessage(`Propuesta enviada con tarifa de ${formatCOP(hourlyRate)} por hora`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error creating proposal:', err);
      setError(err.response?.data?.error || 'Error al enviar la propuesta. Por favor, intenta nuevamente.');
    } finally {
      setSubmittingProposal(null);
    }
  };

  return (
    <div className="freelancer-container">
      <div className="container py-5">
        {/* Header Section */}
        <div className="freelancer-header text-center mb-5">
          <h1 className="fw-bold" style={{color: '#22298d'}}>Oportunidades Disponibles</h1>
          <p className="lead text-muted">Encuentra proyectos que se ajusten a tus habilidades y experiencia</p>
        </div>

        {/* Error Alert */}
        {error && !loading && (
          <div className="row mb-4">
            <div className="col-12">
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error:</strong> {error}
                <button type="button" className="btn-close" onClick={() => setError(null)}></button>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="row mb-4">
            <div className="col-12">
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {successMessage}
                <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3 text-muted">Cargando ofertas disponibles...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="row mb-4 justify-content-center">
              <div className="col-md-3">
                <div className="stat-card text-center p-3">
                  <h3 className="fw-bold text-primary">{offers.length}</h3>
                  <p className="text-muted mb-0">Ofertas Activas</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stat-card text-center p-3">
                  <h3 className="fw-bold text-success">{getAcceptedProposalsCount()}</h3>
                  <p className="text-muted mb-0">Propuestas Aceptadas</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stat-card text-center p-3">
                  <h3 className="fw-bold text-warning">{getSentProposalsCount()}</h3>
                  <p className="text-muted mb-0">Propuestas Enviadas</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stat-card text-center p-3">
                  <h3 className="fw-bold text-danger">{getRejectedProposalsCount()}</h3>
                  <p className="text-muted mb-0">Propuestas Rechazadas</p>
                </div>
              </div>
            </div>

            {/* Offers Grid */}
            <div className="row">
              {offers.length > 0 ? (
                offers.map((offer) => {
                  const hasProposal = hasProposalForOffer(offer.offerId);
                  const proposal = getProposalForOffer(offer.offerId);
                  
                  return (
                    <div key={offer.offerId} className="col-lg-6 mb-4">
                      <div className="offer-card card h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                          {/* Offer Header */}
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                              <h5 className="card-title fw-bold text-primary mb-2">{offer.title}</h5>
                              <p className="text-muted mb-1">
                                <i className="bi bi-building me-2"></i>
                                {offer.ownerId || 'Cliente'}
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
                              {offer.skills ? (
                                offer.skills.split(',').map((skill, index) => (
                                  <span key={index} className="skill-tag">
                                    {skill.trim()}
                                  </span>
                                ))
                              ) : (
                                <span className="text-muted">No especificadas</span>
                              )}
                            </div>
                          </div>

                          {/* Offer Details */}
                          <div className="offer-details row text-center mb-4">
                            <div className="col-4">
                              <div className="detail-item">
                                <h6 className="fw-bold text-primary">Tarifa/Hora</h6>
                                <p className="mb-0 budget-amount">{formatCOP(offer.hourlyRate || 0)}</p>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="detail-item">
                                <h6 className="fw-bold text-primary">Duración</h6>
                                <p className="mb-0">{offer.duration || 'No especificada'}</p>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="detail-item">
                                <h6 className="fw-bold text-primary">Publicado</h6>
                                <p className="mb-0">{formatDate(offer.createdAt)}</p>
                              </div>
                            </div>
                          </div>

                          {/* Proposal Form or Status */}
                          {!hasProposal ? (
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
                                  disabled={submittingProposal === offer.offerId}
                                  onClick={() => {
                                    const rateInput = document.getElementById(`rate-${offer.offerId}`);
                                    const hourlyRate = parseFloat(rateInput.value);
                                    if (hourlyRate && hourlyRate >= 10000) {
                                      handleSendProposal(offer.offerId, hourlyRate, offer.ownerId);
                                    } else {
                                      setError('Por favor ingresa una tarifa válida (mínimo $10,000 COP/hora)');
                                    }
                                  }}
                                >
                                  {submittingProposal === offer.offerId ? 'Enviando...' : 'Enviar Propuesta'}
                                </button>
                              </div>
                            </div>
                          ) : proposal?.status === 'Accepted' ? (
                            <div className="alert alert-success text-center mb-0">
                              <i className="bi bi-check-circle-fill me-2"></i>
                              Propuesta Aceptada
                            </div>
                          ) : proposal?.status === 'Rejected' ? (
                            <div className="alert alert-danger text-center mb-0">
                              <i className="bi bi-x-circle-fill me-2"></i>
                              Propuesta Rechazada
                            </div>
                          ) : (
                            <div className="alert alert-info text-center mb-0">
                              <i className="bi bi-hourglass-split me-2"></i>
                              Propuesta Enviada
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : !loading && (
                <div className="col-12">
                  <div className="text-center py-5">
                    <div className="empty-state">
                      <i className="bi bi-inbox display-1 text-muted mb-3"></i>
                      <h4 className="text-muted">No hay ofertas disponibles</h4>
                      <p className="text-muted">Vuelve más tarde para ver nuevas oportunidades</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}