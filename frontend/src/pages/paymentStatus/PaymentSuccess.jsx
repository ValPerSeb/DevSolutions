// src/pages/PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getContractById, updateContract } from "../../services/contractService";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const contractId = searchParams.get("contractId");
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const merchantOrderId = searchParams.get("merchant_order_id");

  const [updating, setUpdating] = useState(!!contractId);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const markContractAsPaid = async () => {
      if (!contractId) return;

      try {
        setError(null);
        setUpdating(true);

        const contract = await getContractById(contractId);

        if (!contract) {
          setError("No se encontró el contrato asociado al pago.");
          return;
        }

        await updateContract(contract.contractId, {
          ...contract,
          paymentStatus: "paid",
        });

        setUpdated(true);
      } catch (err) {
        console.error("Error actualizando contrato después del pago:", err);
        setError(
          err.response?.data?.error ||
            "No fue posible marcar el contrato como pagado. Contacta al soporte."
        );
      } finally {
        setUpdating(false);
      }
    };

    markContractAsPaid();
  }, [contractId]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center p-5">
              <div className="mb-4">
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "4rem" }}></i>
              </div>
              <h2 className="fw-bold mb-3 text-success">¡Pago exitoso!</h2>
              <p className="text-muted mb-4">
                Tu pago ha sido procesado correctamente por MercadoPago.
              </p>

              {contractId && (
                <p className="mb-1">
                  <strong>Contrato:</strong> {contractId}
                </p>
              )}
              {paymentId && (
                <p className="mb-1">
                  <strong>ID de pago:</strong> {paymentId}
                </p>
              )}
              {merchantOrderId && (
                <p className="mb-3">
                  <strong>Orden:</strong> {merchantOrderId}
                </p>
              )}

              {status && (
                <p className="mb-3">
                  <strong>Estado de MercadoPago:</strong> {status}
                </p>
              )}

              {/* Estado de actualización del contrato */}
              {updating && (
                <div className="alert alert-info mt-3">
                  Actualizando estado del contrato...
                </div>
              )}

              {updated && !updating && !error && (
                <div className="alert alert-success mt-3">
                  El contrato ha sido marcado como <strong>pagado</strong> en el sistema.
                </div>
              )}

              {error && (
                <div className="alert alert-danger mt-3">
                  {error}
                </div>
              )}

              <div className="mt-4">
                <Link to="/Contratos" className="btn btn-primary btn-lg">
                  Volver a contratos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
