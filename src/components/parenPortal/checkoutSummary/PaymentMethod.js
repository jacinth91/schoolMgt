import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./PaymentMethod.css";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("");

  const handlePaymentSelection = (method) => {
    setSelectedMethod(method);
  };

  const handleProceed = () => {
    if (!selectedMethod) {
      toast.warning("Please select a payment method!", {
        position: "top-right",
      });
      return;
    }
    navigate("/payment-gateway", { state: { method: selectedMethod } });
  };

  return (
    <div className="container py-4">
      <div className="card p-4 shadow-lg border-0 rounded">
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            id="creditCard"
            value="Credit/Debit Card"
            onChange={() => handlePaymentSelection("Credit/Debit Card")}
          />
          <label className="form-check-label" htmlFor="creditCard">
            Credit/Debit Card
          </label>
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            id="upi"
            value="UPI"
            onChange={() => handlePaymentSelection("UPI")}
          />
          <label className="form-check-label" htmlFor="upi">
            UPI (Google Pay, PhonePe, Paytm)
          </label>
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            id="netBanking"
            value="Net Banking"
            onChange={() => handlePaymentSelection("Net Banking")}
          />
          <label className="form-check-label" htmlFor="netBanking">
            Net Banking
          </label>
        </div>
        <button
          className="btn btn-success w-100 mt-3 rounded-pill"
          onClick={handleProceed}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
