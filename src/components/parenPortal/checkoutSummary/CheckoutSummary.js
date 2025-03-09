import React from "react";
import CheckoutStepper from "../checkoutStepper/checkoutStepper";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Cart from "./Cart";
import PlacedOrder from "./PlacedOrder";
import PaymentMode from "./PaymentMode";
import Shipping from "./Shipping";

const steps = ["cart", "shipping", "payment", "place-order"];
const CheckoutSummary = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeStep = props.stepPaths.indexOf(location.pathname); // Determine active step index

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      navigate(props.stepPaths[activeStep + 1]); // Move to next step
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      navigate(props.stepPaths[activeStep - 1]); // Move to previous step
    }
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Checkout Process</h2>

      {/* Stepper Navigation */}
      <CheckoutStepper activeStep={activeStep} />

      {/* Render Step Components Based on URL */}
      <Routes>
        <Route exact path="cart" element={<Cart />} />
        <Route exact path="/shipping" element={<Shipping />} />
        <Route exact path="/payment" element={<PaymentMode />} />
        <Route exact path="/checkout" element={<PlacedOrder />} />
      </Routes>

      {/* Navigation Buttons */}
      <div style={{ marginTop: 20 }}>
        <Button onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
          variant="contained"
          style={{ marginLeft: 10 }}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
