import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductDetail.css";
import shirtImage from "../../../images/shirt.png"; // Adjust path as needed

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) to cart!`);
  };

  return (
    <div className="container my-5">
      <div className="card product-card p-3">
        <div className="row g-0">
          {/* Product Image */}
          <div className="col-md-4 text-center">
            <img
              src={shirtImage}
              alt="Product"
              className="img-fluid product-img"
            />
          </div>

          {/* Vertical Line */}
          <div className="col-md-1 d-flex justify-content-center">
            <div className="vr"></div>
          </div>

          {/* Product Details */}
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="product-title">DPS Uniform</h5>
              <p className="product-description">
                DPS White Shirt - Full Sleeve
              </p>
              <p>
                <strong>Size:</strong> 30”
              </p>
              <p>
                <strong>Price:</strong> ₹378
              </p>

              {/* Quantity Control */}
              <div className="d-flex align-items-center my-3">
                <strong className="me-3">Qty:</strong>
                <button
                  className="btn btn-light qty-btn"
                  onClick={handleDecrease}
                >
                  -
                </button>
                <span className="mx-2">{quantity}</span>
                <button
                  className="btn btn-light qty-btn"
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button className="btn add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
