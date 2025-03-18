import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfilePage.css";
import {
  PersonFill,
  EnvelopeFill,
  TelephoneFill,
  GeoAltFill,
} from "react-bootstrap-icons";
import profileImg from "../../images/profile.png";
import PopupDialog from "../layout/PopupDialog";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const dummyData = [
    { label: "Name", value: "John Doe", editable: true },
    { label: "Email", value: "john.doe@example.com", editable: true },
    { label: "Phone", value: "+1234567890", editable: false },
    { label: "Address", value: "123 Street, City", editable: true },
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState(dummyData);

  const { user } = useSelector((state) => state.auth);

  const handleSave = (updatedData) => {
    console.log("Updated Data:", updatedData);
    setFormData(updatedData);
    setShowPopup(false);
  };

  if (!user)
    return <div className="text-center mt-5 text-danger">User not found!</div>;

  return (
    <div className="container profile-container">
      <div className="text-center">
        <img
          src={user.profileImage ?? profileImg}
          alt="Profile"
          className="profile-image mx-auto"
        />
      </div>
      <hr />
      <h5 className="text-primary">Personal Details:</h5>

      <div className="profile-card">
        <div className="profile-row">
          <PersonFill className="icon" /> <strong>Full Name:</strong>{" "}
          <span>{user.parentName}</span>
        </div>
        <div className="profile-row">
          <EnvelopeFill className="icon" /> <strong>Email:</strong>{" "}
          <span>{user.email}</span>
        </div>
        <div className="profile-row">
          <TelephoneFill className="icon" /> <strong>Mobile:</strong>{" "}
          <span>{user.phone}</span>
        </div>
        <div className="profile-row">
          <GeoAltFill className="icon" /> <strong>Address:</strong>{" "}
          <span>{user.address}</span>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn update-btn" onClick={() => setShowPopup(true)}>
          Update
        </button>
      </div>
      {showPopup && (
        <PopupDialog
          data={formData}
          onSave={handleSave}
          onCancel={() => setShowPopup(false)}
          header={"Edit Profile"}
        />
      )}
    </div>
  );
};

export default ProfilePage;
