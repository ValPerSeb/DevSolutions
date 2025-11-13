// src/pages/PaymentFailure.jsx
import React from "react";
import { useSearchParams, Link } from "react-router-dom";

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const contractId = searchParams.get("contractId");
  const status = searchParams.get("status");
  const paymentId = searchParams.get("payment_id");

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center p-5">
              <div className="mb-4">
                <i className="bi bi-x-circle-fill text-danger" style={{ fontSize: "4rem" }}></i>
              </div>
              <h2 className="fw-bold mb-3 text-danger">Pago rechazado</h2>
              <p className="text-muted mb-4">
                Tu pago no pudo ser procesado o fue rechazado por MercadoPago.
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
              {status && (
                <p className="mb-3">
                  <strong>Estado reportado:</strong> {status}
                </p>
              )}

              <p className="text-muted">
                Puedes intentar nuevamente más tarde o utilizar otro medio de pago.
              </p>

              <div className="mt-4">
                <Link to="/" className="btn btn-outline-primary btn-lg">
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

export default PaymentFailure;
