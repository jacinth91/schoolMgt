import React, { useState } from "react";
import { Trash } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CartItem.css";
import shirtImage from "../../../images/shirt.png";

const CartItem = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="mb-3">
      <div className="card shadow-sm cart-item">
        <div className="row g-0 align-items-stretch p-3">
          {/* Product Image */}
          <div className="col-md-2 col-4 text-center d-flex align-items-center">
            <img
              src={shirtImage}
              alt="DPS White Shirt"
              className="img-fluid rounded"
            />
          </div>

          {/* Product Details */}
          <div className="col-md-6 col-8 px-3">
            <h5 className="text-primary fw-bold">DPS Uniform</h5>
            <p className="mb-1">DPS White Shirt</p>
            <p className="mb-1">Full Sleeve</p>
            <p className="mb-0">
              <strong>Size:</strong> 30" &nbsp; | &nbsp; <strong>₹ 378</strong>
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="col-md-2 col-6 text-center">
            <p className="fw-bold mb-1">Qty</p>
            <div className="input-group">
              <button className="btn btn-light border" onClick={handleDecrease}>
                -
              </button>
              <input
                type="text"
                className="form-control text-center"
                value={quantity}
                readOnly
                style={{ maxWidth: "50px" }}
              />
              <button className="btn btn-light border" onClick={handleIncrease}>
                +
              </button>
            </div>
          </div>

          {/* Delete Button */}
          <div className="col-md-2 col-6 text-center">
            <button className="btn text-danger">
              <Trash size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
