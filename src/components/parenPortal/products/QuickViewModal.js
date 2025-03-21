import React from "react";

const QuickViewModal = ({ bundle, onClose }) => {
  if (!bundle) return null;

  // If bundle.items is a simple array, we'll default the quantity to 1.
  // Alternatively, if you have more detailed data, you can map through that.
  const tableRows = bundle.items.map((item, index) => (
    <tr key={index}>
      <td>{item}</td>
      <td>1</td>
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
          <div className="modal-body">
            <img
              src={bundle.image}
              className="img-fluid mb-3"
              alt={bundle.name}
              style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }}
            />
            <p>
              <strong>Grade:</strong> {bundle.grade}
            </p>
            <p>
              <strong>Price:</strong> ₹{bundle.price}
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
            <button type="button" className="btn btn-primary">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
