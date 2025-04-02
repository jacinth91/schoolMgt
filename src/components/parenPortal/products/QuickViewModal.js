import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const QuickViewModal = ({ bundle, onClose, onAddToCart, showAction, user }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  if (!bundle) return null;

  const handleAddToCart = () => {
    if (!selectedStudent) {
      toast.error("Please select a student before adding to cart.", {
        position: "top-right",
      });
      return;
    }
    onAddToCart(bundle.bundle_id, quantity, selectedStudent);
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
            <p>
              <strong>Designed For:</strong> {bundle.gender}
            </p>
            {showAction && (
              <p>
                <strong>Recommended For:</strong> {bundle.class_name}
              </p>
            )}
            <p>
              <strong>Suitable For Classes:</strong> {bundle.applicable_classes}
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
                    <th>Unit Price</th>
                    <th>Optional</th>
                  </tr>
                </thead>
                <tbody>
                  {bundle.products.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product_name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unit_price}</td>
                      <td>{item.optional ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="modal-footer">
            {showAction && (
              <>
                {/* Student Selection Dropdown */}
                {user.studentData.length > 0 && (
                  <div className="d-flex align-items-center">
                    <label className="me-2" htmlFor="studentSelect">
                      Student:
                    </label>
                    <select
                      id="studentSelect"
                      className="form-select me-3"
                      style={{ width: "200px" }}
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Student
                      </option>
                      {user.studentData.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.studentName}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Quantity Selection Dropdown */}
                <div className="d-flex align-items-center">
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
                </div>
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
