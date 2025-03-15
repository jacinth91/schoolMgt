import React from "react";

const ThankYouPage = () => {
  return (
    <div className="container text-center d-flex flex-column align-items-center justify-content-center vh-100">
      <div
        className="card p-4 shadow-lg border-0"
        style={{ maxWidth: "500px" }}
      >
        <div className="card-body">
          <i
            className="bi bi-check-circle-fill text-success mb-3"
            style={{ fontSize: "80px" }}
          ></i>
          <h2 className="text-success fw-bold">Order Placed Successfully</h2>
          <p className="text-muted">
            Your order number is <strong>00003322</strong>
          </p>
          <p className="text-secondary">
            We will email you an order confirmation with details and tracking
            info.
          </p>
          <a href="/" className="btn btn-success mt-3 px-4">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
