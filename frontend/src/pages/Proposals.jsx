import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/Contratos.css";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAllProposals, updateProposal } from '../services/proposalService';
import { getOfferById } from '../services/offerService';
import { createContract } from '../services/contractService';

export default function Proposals() {
  const { profile: clientId, role, token, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [processingProposal, setProcessingProposal] = useState(null);

  /**
   * Redirect if not authenticated or not a client
   */
  useEffect(() => {
    if (!authLoading && (!clientId || role !== 'client')) {
      navigate('/Login');
    }
  }, [authLoading, clientId, role, navigate]);

  /**
   * Fetch proposals on component mount
   */
  useEffect(() => {
    if (!authLoading && clientId && token && role === 'client') {
      fetchProposals();
    }
  }, [clientId, token, authLoading, role]);

  /**
   * Fetch all proposals and filter by clientId
   */
  const fetchProposals = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllProposals();
      
      // Filter proposals by clientId
      const filtered = (data || []).filter(p => p.clientId === clientId);
      setProposals(filtered);
    } catch (err) {
      console.error('Error fetching proposals:', err);
      setError(err.response?.data?.error || 'Error al cargar las propuestas. Por favor, intenta nuevamente.');
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
    return new Date(dateString).toLocaleDateString('es-CO');
  };

  /**
   * Get count of sent proposals
   */
  const getSentProposalsCount = () => {
    return proposals.filter(p => p.status === 'Sent').length;
  };

  /**
   * Get count of accepted proposals
   */
  const getAcceptedProposalsCount = () => {
    return proposals.filter(p => p.status === 'Accepted').length;
  };

  /**
   * Get count of rejected proposals
   */
  const getRejectedProposalsCount = () => {
    return proposals.filter(p => p.status === 'Rejected').length;
  };

  /**
   * Handle accepting a proposal
   */
  const handleAceptar = async (proposal) => {
    try {
      setProcessingProposal(proposal.proposalId);
      setError(null);

      // Get offer details to calculate contract data
      const offer = await getOfferById(proposal.offerId);

      // Calculate contract dates
      const startDate = new Date();
      const signDate = new Date();
      let endDate = new Date(startDate);
      
      // Parse duration to add to endDate
      const durationText = offer.duration || '1 mes';
      if (durationText.includes('semana')) {
        const weeks = parseInt(durationText);
        endDate.setDate(endDate.getDate() + (weeks * 7));
      } else if (durationText.includes('mes')) {
        const months = parseInt(durationText);
        endDate.setMonth(endDate.getMonth() + months);
      } else if (durationText.includes('año')) {
        const years = parseInt(durationText);
        endDate.setFullYear(endDate.getFullYear() + years);
      }

      const totalAmount = proposal.hourlyRate * offer.totalHours;

      // Create contract
      const contractData = {
        clientId: proposal.clientId,
        freelanceId: proposal.freelanceId,
        proposalId: proposal.proposalId,
        description: offer.description,
        startDate: startDate.toISOString().split('T')[0],
        signDate: signDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        hourlyRate: proposal.hourlyRate,
        totalHours: offer.totalHours,
        totalAmount: totalAmount,
        paymentStatus: 'pending'
      };

      await createContract(contractData);

      // Update proposal status to Accepted
      await updateProposal(proposal.proposalId, {
        ...proposal,
        status: 'Accepted'
      });

      // Update local state
      setProposals(proposals.map(p =>
        p.proposalId === proposal.proposalId ? { ...p, status: 'Accepted' } : p
      ));

      setSuccessMessage('¡Propuesta aceptada y contrato creado exitosamente!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error accepting proposal:', err);
      setError(err.response?.data?.error || 'Error al aceptar la propuesta. Por favor, intenta nuevamente.');
    } finally {
      setProcessingProposal(null);
    }
  };

  /**
   * Handle rejecting a proposal
   */
  const handleRechazar = async (proposal) => {
    try {
      setProcessingProposal(proposal.proposalId);
      setError(null);

      // Update proposal status to Rejected
      await updateProposal(proposal.proposalId, {
        ...proposal,
        status: 'Rejected'
      });

      // Update local state
      setProposals(proposals.map(p =>
        p.proposalId === proposal.proposalId ? { ...p, status: 'Rejected' } : p
      ));

      setSuccessMessage('Propuesta rechazada');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error rejecting proposal:', err);
      setError(err.response?.data?.error || 'Error al rechazar la propuesta. Por favor, intenta nuevamente.');
    } finally {
      setProcessingProposal(null);
    }
  };

  return (
    <div className="contratos-container">
      <div className="container py-5">
        {/* Header */}
        <div className="contratos-header text-center mb-5">
          <h1 className="fw-bold" style={{color: '#22298d'}}>Propuestas de Freelancers</h1>
          <p className="lead text-muted">Revisa y gestiona las propuestas que han enviado los freelancers</p>
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
              <p className="mt-3 text-muted">Cargando propuestas...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Estadísticas */}
            <div className="row mb-4 justify-content-center">
              <div className="col-md-3">
                <div className="stat-card text-center p-3">
                  <h3 className="fw-bold text-primary">{getSentProposalsCount()}</h3>
                  <p className="text-muted mb-0">Propuestas Activas</p>
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
                  <h3 className="fw-bold text-danger">{getRejectedProposalsCount()}</h3>
                  <p className="text-muted mb-0">Propuestas Rechazadas</p>
                </div>
              </div>
            </div>

            {/* Lista de Propuestas */}
            <div className="row">
              {proposals.length > 0 ? (
                proposals.map((proposal) => (
                  <div key={proposal.proposalId} className="col-12 mb-4">
                    <div className="contrato-card card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="row align-items-center">
                          {/* Información de la propuesta */}
                          <div className="col-md-8">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                              <div>
                                <h5 className="fw-bold text-primary mb-2">Propuesta #{proposal.proposalId}</h5>
                                <p className="text-muted mb-1">
                                  <strong>Freelancer ID:</strong> {proposal.freelanceId}
                                </p>
                              </div>
                              <span className={`badge ${proposal.status === 'Sent' ? 'bg-warning' : proposal.status === 'Accepted' ? 'bg-success' : 'bg-danger'}`}>
                                {proposal.status === 'Sent' ? 'Activa' : proposal.status === 'Accepted' ? 'Aceptada' : 'Rechazada'}
                              </span>
                            </div>

                            <div className="contrato-details row">
                              <div className="col-6 col-md-3">
                                <small className="text-muted">Oferta</small>
                                <p className="mb-0 fw-semibold">#{proposal.offerId}</p>
                              </div>
                              <div className="col-6 col-md-3">
                                <small className="text-muted">Tarifa/Hora</small>
                                <p className="mb-0 fw-semibold">{formatCOP(proposal.hourlyRate)}</p>
                              </div>
                              <div className="col-6 col-md-3">
                                <small className="text-muted">Fecha Envío</small>
                                <p className="mb-0 fw-semibold">{formatDate(proposal.createdAt)}</p>
                              </div>
                              <div className="col-6 col-md-3">
                                <small className="text-muted">Estado</small>
                                <p className="mb-0 fw-semibold">{proposal.status}</p>
                              </div>
                            </div>
                          </div>

                          {/* Acciones */}
                          <div className="col-md-4 text-center">
                            <div className="pago-section">
                              {proposal.status === 'Sent' ? (
                                <div className="d-grid gap-2">
                                  <button 
                                    className="btn btn-success"
                                    onClick={() => handleAceptar(proposal)}
                                    disabled={processingProposal === proposal.proposalId}
                                  >
                                    {processingProposal === proposal.proposalId ? 'Procesando...' : 'Aceptar'}
                                  </button>
                                  <button 
                                    className="btn btn-danger"
                                    onClick={() => handleRechazar(proposal)}
                                    disabled={processingProposal === proposal.proposalId}
                                  >
                                    {processingProposal === proposal.proposalId ? 'Procesando...' : 'Rechazar'}
                                  </button>
                                </div>
                              ) : proposal.status === 'Accepted' ? (
                                <div className="alert alert-success mb-0">
                                  <strong>✓ Aceptada</strong>
                                </div>
                              ) : (
                                <div className="alert alert-danger mb-0">
                                  <strong>✗ Rechazada</strong>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div className="text-center py-5">
                    <div className="empty-state">
                      <i className="bi bi-inbox display-1 text-muted mb-3"></i>
                      <h4 className="text-muted">No hay propuestas</h4>
                      <p className="text-muted">Aún no has recibido propuestas de freelancers</p>
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
