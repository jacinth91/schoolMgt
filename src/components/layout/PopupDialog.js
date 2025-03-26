import React, { useState } from "react";

const PopupDialog = ({ data, onSave, onCancel, header }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (index, newValue) => {
    const updatedData = [...formData];
    updatedData[index].value = newValue;
    setFormData(updatedData);
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title col-md-10 text-start">
              {header ? header : "Edit Data"}
            </h5>
            <button
              type="button"
              className="close col-md-2 text-end"
              onClick={onCancel}
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {formData.map((item, index) => (
              <div className="form-group row my-2" key={index}>
                <label className="col-sm-4 col-form-label text-right">
                  {item.label}
                </label>
                <div className="col-sm-8">
                  {item.editable ? (
                    item.options && Array.isArray(item.options) ? (
                      // Dropdown (Select) Field with Default Option
                      <select
                        className="form-control"
                        value={item.value}
                        onChange={(e) => handleChange(index, e.target.value)}
                      >
                        <option value="">Select an option</option>
                        {item.options.map((option) => (
                          <option key={option.key} value={option.key}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      // Text Input Field
                      <input
                        type="text"
                        className="form-control"
                        value={item.value}
                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                    )
                  ) : (
                    // Read-only Text
                    <p className="form-control-plaintext text-start">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onSave(formData)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupDialog;
