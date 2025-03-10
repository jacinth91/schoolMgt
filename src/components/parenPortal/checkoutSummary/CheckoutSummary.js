import React from "react";
import CheckoutStepper from "../checkoutStepper/checkoutStepper";
import { Route, Routes, useLocation } from "react-router-dom";
import Cart from "./Cart";
import PlacedOrder from "./PlacedOrder";
import PaymentMode from "./PaymentMode";
import Shipping from "./Shipping";
import "./CheckoutSummary.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";

const stepLabel = [
  "SHOPPING CART",
  "SHIPPING",
  "PAYMENT",
  "ORDER CONFIRMATION",
];
const CheckoutSummary = (props) => {
  const location = useLocation();
  const activeStep = props.stepPaths.indexOf(location.pathname); // Determine active step index

  return (
    <div>
      <div className="container-fluid stepper-header">
        <div className="container py-3">
          <div className="row">
            <div className="col-md-4">
              <div className="h-100 align-content-around">
                <ArrowBackIcon /> Continue Shopping
              </div>
            </div>
            <div className="col-md-8">
              <div class="search-box w-50">
                <input type="text" placeholder="Search Products" />
                <span class="icon">
                  <SearchIcon />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Stepper Navigation */}
      <div className="container">
        <div className="stepper-label mt-4">{stepLabel[activeStep]}</div>
      </div>

      <CheckoutStepper activeStep={activeStep} />

      {/* Render Step Components Based on URL */}
      <Routes>
        <Route exact path="cart" element={<Cart />} />
        <Route exact path="/shipping" element={<Shipping />} />
        <Route exact path="/payment" element={<PaymentMode />} />
        <Route exact path="/checkout" element={<PlacedOrder />} />
      </Routes>
    </div>
  );
};

export default CheckoutSummary;
