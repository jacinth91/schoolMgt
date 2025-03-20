import React, { useState } from "react";
import { useSelector } from "react-redux";
import { submitSupportQuery } from "../../actions/support";

const SupportForm = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    parentName: "",
    studentId: "",
    queryType: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted", formData, user);
    const response = submitSupportQuery(formData, user);
    console.log(response);

    // API call can be made here
    // fetch("/api/submit-query", {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    //   headers: { "Content-Type": "application/json" }
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error("Error:", error));
  };

  return (
    <div className="container my-5 ">
      <h3 className="text-primary">Submit Query</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Parent Name</label>
          <input
            type="text"
            className="form-control"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Student Enrollment ID</label>
          <input
            type="text"
            className="form-control"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Query Type</label>
          <select
            className="form-select"
            name="queryType"
            value={formData.queryType}
            onChange={handleChange}
            required
          >
            <option value="">Select Query Type</option>
            <option value="Account">Account</option>
            <option value="Products">Products</option>
            <option value="Billing">Billing</option>
            <option value="Delivery">Delivery</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success">
            Submit Query
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupportForm;
