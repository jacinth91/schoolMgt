import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ChildrenDetails.css"; // Import styles

const ChildrenDetails = () => {
  const { userId } = useParams(); // Get userId from URL params

  // Dummy Data
  const [childrenData, setChildrenData] = useState([
    {
      id: 1,
      name: "John Smith",
      gender: "male",
      enrollmentId: "SCID123",
      grade: "1st Grade",
      section: "A Section",
      house: "Red",
    },
    {
      id: 2,
      name: "Rose Smith",
      gender: "female",
      enrollmentId: "SCID456",
      grade: "2nd Grade",
      section: "B Section",
      house: "Blue",
    },
  ]);

  const [selectedChild, setSelectedChild] = useState(childrenData[0]);

  // Uncomment this to fetch child details dynamically
  /*
  useEffect(() => {
    fetch(`https://api.example.com/children/${userId}`)
      .then(response => response.json())
      .then(data => {
        setChildrenData(data);
        setSelectedChild(data[0]); // Select first child by default
      })
      .catch(error => console.error("Error fetching child details:", error));
  }, [userId]);
  */

  return (
    <div className="container text-center mt-4">
      {/* Child Icons */}
      <div className="row justify-content-center">
        {childrenData.map((child) => (
          <div key={child.id} className="col-auto text-center">
            <div
              className={`child-circle ${
                selectedChild.id === child.id ? "selected" : ""
              }`}
              onClick={() => setSelectedChild(child)}
            >
              {/* Boy/Girl Icon */}
              <i
                className={`bi ${
                  child.gender === "male"
                    ? "bi-person-circle"
                    : "bi-person-fill"
                }`}
              ></i>
            </div>
            <p
              className={`child-name ${
                selectedChild.id === child.id ? "selected-text" : ""
              }`}
            >
              {child.name}
            </p>
          </div>
        ))}
      </div>

      {/* Child Details Table */}
      <div className="row">
        <div className="col-md-2">
          <h6 className="text-primary text-sm-start">
            <strong>Children Details:</strong>{" "}
          </h6>
        </div>
        <div className="col-md-auto">
          <span>
            Enrollment ID: <strong>{selectedChild.enrollmentId}</strong>
          </span>
        </div>
      </div>
      <div className="card my-3 p-3 shadow-sm">
        <table className="table table-bordered mt-2">
          <tbody className="text-sm-start">
            <tr>
              <td className="w-25">
                <i className="bi bi-person"></i> <strong>Full Name:</strong>
              </td>
              <td>{selectedChild.name}</td>
            </tr>
            <tr>
              <td className="w-25">
                <i className="bi bi-mortarboard"></i> <strong>Grade:</strong>
              </td>
              <td>{selectedChild.grade}</td>
            </tr>
            <tr>
              <td className="w-25">
                <i className="bi bi-book"></i> <strong>Section:</strong>
              </td>
              <td>{selectedChild.section}</td>
            </tr>
            <tr>
              <td className="w-25">
                <i className="bi bi-house"></i> <strong>House Name:</strong>
              </td>
              <td>{selectedChild.house}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChildrenDetails;
