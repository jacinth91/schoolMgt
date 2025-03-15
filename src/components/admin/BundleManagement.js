import React, { useEffect, useState } from "react";

const BundleManagement = () => {
  const [bundles, setBundles] = useState([]);

  const onView = () => {};

  const onDelete = () => {};

  const onEdit = () => {};

  useEffect(() => {
    // Fetch data from API (Uncomment when API is ready)
    // fetch("API_ENDPOINT_HERE")
    //   .then(response => response.json())
    //   .then(data => setBundles(data))
    //   .catch(error => console.error("Error fetching bundles:", error));

    // Using dummy data for now
    const dummyBundles = [
      { id: 1, name: "John Doe", grade: "5", house: "Red", gender: "Male" },
      {
        id: 2,
        name: "Jane Smith",
        grade: "6",
        house: "Blue",
        gender: "Female",
      },
      {
        id: 3,
        name: "Alice Brown",
        grade: "7",
        house: "Green",
        gender: "Female",
      },
      {
        id: 4,
        name: "Bob Johnson",
        grade: "8",
        house: "Yellow",
        gender: "Male",
      },
      {
        id: 5,
        name: "Charlie Davis",
        grade: "9",
        house: "Red",
        gender: "Male",
      },
    ];
    setBundles(dummyBundles);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className=" mb-4">Bundle List</h2>
      <table className="table table-bordered table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Grade</th>
            <th>House</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bundles.length > 0 ? (
            bundles.map((bundle, index) => (
              <tr key={bundle.id}>
                <td>{index + 1}</td>
                <td>{bundle.name}</td>
                <td>{bundle.grade}</td>
                <td>{bundle.house}</td>
                <td>{bundle.gender}</td>
                <td>
                  <button
                    className="btn btn-primary  btn-sm me-2"
                    onClick={() => onView(bundle)}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button
                    className="btn btn-warning  btn-sm me-2"
                    onClick={() => onEdit(bundle)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-danger  btn-sm"
                    onClick={() => onDelete(bundle.id)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No bundles available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BundleManagement;
