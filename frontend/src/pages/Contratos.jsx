import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/Contratos.css";
import { useAuth } from '../context/AuthContext';
import { getAllContracts, updateContract } from '../services/contractService';
import { createPreference } from '../services/mercadoPagoService';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY);

export default function Contratos() {
  const { profile, role, token, loading: authLoading } = useAuth();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [payingContract, setPayingContract] = useState(null);
  const [preferences, setPreferences] = useState({});

  /**
   * Fetch contracts on component mount
   */
  useEffect(() => {
    if (!authLoading && profile && token) {
      fetchContracts();
    } else if (!authLoading && !profile) {
      setError('No se encontró el perfil. Por favor, inicia sesión nuevamente.');
      setLoading(false);
    }
  }, [profile, token, authLoading]);

  /**
   * Fetch all contracts and filter by role
   */
  const fetchContracts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllContracts();

      // Filter contracts based on role
      let filtered = data || [];
      if (role === 'freelance') {
        filtered = filtered.filter(c => c.freelanceId === profile);
      } else if (role === 'client') {
        filtered = filtered.filter(c => c.clientId === profile);
      }

      setContracts(filtered);
    } catch (err) {
      console.error('Error fetching contracts:', err);
      setError(err.response?.data?.error || 'Error al cargar los contratos. Por favor, intenta nuevamente.');
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
   * Get count of paid contracts
   */
  const getPaidContractsCount = () => {
    return contracts.filter(c => c.paymentStatus === 'paid').length;
  };

  /**
   * Get count of pending contracts
   */
  const getPendingContractsCount = () => {
    return contracts.filter(c => c.paymentStatus === 'pending').length;
  };


  const handlePagar = async (contract) => {
    try {
      setPayingContract(contract.contractId);
      setError(null);

      const mercadopagoForm = {
        title: 'Pago de Contrato: ' + contract.contractId,
        description: contract.description,
        price: contract.totalAmount,
        quantity: 1,
        contractId: contract.contractId
      };

      const preferenceResponse = await createPreference(mercadopagoForm);

      if (!preferenceResponse || !preferenceResponse.id) {
        setError('Error al crear la preferencia de pago. Por favor, intenta nuevamente.');
        return;
      }

      setPreferences(prev => ({
        ...prev,
        [contract.contractId]: preferenceResponse.id
      }));

    } catch (err) {
      console.error('Error al crear la preferencia de pago: ', err);
      setError(err.response?.data?.error || 'Error al crear la preferencia de pago. Por favor, intenta nuevamente.');
      setPayingContract(null);
    }
  };

  return (
    <div className="contratos-container">
      <div className="container py-5">
        {/* Header */}
        <div className="contratos-header text-center mb-5">
          <h1 className="fw-bold" style={{ color: '#22298d' }}>Gestión de Contratos</h1>
          <p className="lead text-muted">Administra y realiza pagos de tus contratos activos</p>
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
              <p className="mt-3 text-muted">Cargando contratos...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Estadísticas */}
            <div className="row mb-4 justify-content-center">
              <div className="col-md-3">
                <div className="stat-card text-center p-3">
                  <h3 className="fw-bold text-primary">{contracts.length}</h3>
                  <p className="text-muted mb-0">Total Contratos</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stat-card text-center p-3">
                  <h3 className="fw-bold text-success">{getPaidContractsCount()}</h3>
                  <p className="text-muted mb-0">Contratos Pagados</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stat-card text-center p-3">
                  <h3 className="fw-bold text-warning">{getPendingContractsCount()}</h3>
                  <p className="text-muted mb-0">Contratos pendientes de pago</p>
                </div>
              </div>
            </div>

            {/* Lista de Contratos */}
            <div className="row">
              {contracts.length > 0 ? (
                contracts.map((contrato) => (
                  <div key={contrato.contractId} className="col-12 mb-4">
                    <div className="contrato-card card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="row align-items-center">
                          {/* Información del contrato */}
                          <div className="col-md-8">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                              <div>
                                <h5 className="fw-bold text-primary mb-2">{contrato.description}</h5>
                                <p className="text-muted mb-1">
                                  <strong>{role === 'freelance' ? 'Cliente' : 'Freelancer'}:</strong> {role === 'freelance' ? contrato.clientId : contrato.freelanceId}
                                </p>
                              </div>
                              <span className={`badge ${contrato.paymentStatus === 'paid' ? 'bg-success' : contrato.paymentStatus === 'pending' ? 'bg-warning' : 'bg-danger'}`}>
                                {contrato.paymentStatus === 'paid' ? 'Pagado' : contrato.paymentStatus === 'pending' ? 'Pendiente' : 'Rechazado'}
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
                                <small className="text-muted">Total de Horas</small>
                                <p className="mb-0 fw-semibold">{contrato.totalHours || 0}h</p>
                              </div>
                            </div>
                          </div>

                          {/* Acciones y pago */}
                          <div className="col-md-4 text-center">
                            <div className="pago-section">
                              <h4 className="fw-bold text-success mb-2">
                                {formatCOP(contrato.totalAmount || 0)}
                              </h4>

                              {role === 'freelance' ? (
                                // Freelancer view - Show status only
                                <div className="alert alert-info mb-0">
                                  <strong>{contrato.paymentStatus === 'paid' ? 'Pagado' : 'Pendiente de Pago'}</strong>
                                </div>
                              ) : role === 'client' && preferences[contrato.contractId] ? (
                                <div style={{ width: '300px' }}>
                                  <Wallet initialization={{ preferenceId: preferences[contrato.contractId] }} />
                                </div>
                              ) : role === 'client' ? (
                                <>
                                  {contrato.paymentStatus === 'pending' ? (
                                    <button
                                      className="btn btn-success btn-lg w-100"
                                      onClick={() => handlePagar(contrato)}
                                      disabled={payingContract === contrato.contractId}
                                    >
                                      <i className="bi bi-credit-card me-2"></i>
                                      {payingContract === contrato.contractId ? 'Procesando...' : 'Pagar Contrato'}
                                    </button>
                                  ) : contrato.paymentStatus === 'paid' ? (
                                    <button className="btn btn-secondary btn-lg w-100" disabled>
                                      ✓ Pagado
                                    </button>
                                  ) : (
                                    <button className="btn btn-secondary btn-lg w-100" disabled>
                                      X Rechazado
                                    </button>
                                  )}
                                </>
                              ) : null}
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
                      <i className="bi bi-file-earmark-text display-1 text-muted mb-3"></i>
                      <h4 className="text-muted">No hay contratos activos</h4>
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