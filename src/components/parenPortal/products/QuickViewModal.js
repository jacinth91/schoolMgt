import React, { useEffect } from "react";

const QuickViewModal = ({ bundle, onClose, onAddToCart }) => {
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  if (!bundle) return null;

  const tableRows = bundle.products.map((item, index) => (
    <tr key={index}>
      <td>{item.product_name}</td>
      <td>{item.quantity}</td>
      <td>{item.unit_price}</td>
      <td>{item.optional ? "Yes" : "No"}</td>
    </tr>
  ));

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{bundle.name}</h5>
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
              src={
                bundle.image ??
                "https://res.cloudinary.com/dwgfx9feh/image/upload/v1742726808/WhatsApp_Image_2025-03-22_at_11.55.58_AM_1_ekrabi.jpg"
              }
              className="img-fluid mb-3"
              alt={bundle.name}
              style={{ maxHeight: "400px", width: "100%" }}
            />
            <p>
              <strong>Designed for:</strong> {bundle.gender}
            </p>
            <p>
              <strong>Recommended for:</strong> {bundle.class_name}
            </p>
            <p>
              <strong>Suitable for Classes:</strong> {bundle.applicable_classes}
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
                <tbody>{tableRows}</tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
