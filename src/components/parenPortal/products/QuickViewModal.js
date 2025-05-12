import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const QuickViewModal = ({ bundle, onClose, onAddToCart, showAction, user }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  if (!bundle) return null;

  const handleAddToCart = () => {
    onAddToCart(bundle.bundle_id, quantity, bundle.student.id);
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg w-m-50"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{bundle.bundle_name}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div
            className="modal-body"
            style={{ maxHeight: "70vh", overflowY: "auto" }}
          >
            <img
              src={bundle.image}
              className="img-fluid mb-3"
              alt={bundle.bundle_name}
              style={{ maxHeight: "400px", width: "100%" }}
            />
            {showAction && (
              <p>
                <strong>Student Name:</strong> {bundle.student?.studentName}
              </p>
            )}
            <p>
              <strong>Gender:</strong> {bundle.gender}
            </p>
            {showAction && (
              <p>
                <strong>Class:</strong> {bundle.class_name}
              </p>
            )}
            <p>
              <strong>Recommended For:</strong> {bundle.applicable_classes}
            </p>
            <p>
              <strong>Bundle Price:</strong> ₹{bundle.bundle_total}
            </p>

            <h6 className="mt-4">Bundle Contents</h6>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {bundle.products
                    .filter((item) => !item.optional)
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item.product_name}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="modal-footer">
            {showAction && (
              <>
                {/* Quantity Selection Dropdown */}
                {/* <div className="d-flex align-items-center">
                  <label className="me-2" htmlFor="quantitySelect">
                    Quantity:
                  </label>
                  <select
                    id="quantitySelect"
                    className="form-select me-3"
                    style={{ width: "80px" }}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div> */}
              </>
            )}

            <button type="button" className="btn btn-danger" onClick={onClose}>
              Close
            </button>
            {showAction && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
