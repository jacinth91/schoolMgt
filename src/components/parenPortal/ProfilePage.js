import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfilePage.css";
import {
  PersonFill,
  EnvelopeFill,
  TelephoneFill,
  GeoAltFill,
  Building,
} from "react-bootstrap-icons";
import profileImg from "../../images/profile.png";
import PopupDialog from "../layout/PopupDialog";
import { useDispatch, useSelector } from "react-redux";
import FullPageSpinner from "../layout/FullPageSpinner";
import { loadingChange, updateProfile } from "../../actions/auth";

const ProfilePage = () => {
  const { user, loading } = useSelector((state) => state.auth);

  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();

  const handleSave = (updatedData) => {
    dispatch(loadingChange(true));
    setFormData(updatedData);
    const apiBody = reverseTransform(formData);
    dispatch(updateProfile({ ...user, ...apiBody }));
    setShowPopup(false);
  };
  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1") // Convert camelCase to words
      .replace(/[_-]/g, " ") // Replace underscores/hyphens with space
      .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter
      .trim();
  };

  const openDialog = () => {
    if (!user || typeof user !== "object") return [];

    // Define which fields are editable
    const nonEditableFields = ["id", "role", "campus", "password"];
    const skipKeys = ["students", "role", "gender", "studentData", "password"];

    // Transform parent-level data dynamically
    const result = Object.entries(user)
      .filter(([key, value]) => !skipKeys.includes(key)) // Exclude unnecessary fields
      .map(([key, value]) => ({
        label: formatLabel(key),
        value: value,
        editable: !nonEditableFields.includes(key),
      }));
    setFormData(result);
    setShowPopup(true);
  };

  const reverseTransform = (array) => {
    if (!Array.isArray(array)) return {};

    return array.reduce((acc, { label, value }) => {
      const key = formatKey(label);
      acc[key] = value;
      return acc;
    }, {});
  };

  const formatKey = (label) => {
    return label
      .toLowerCase()
      .replace(/\s(.)/g, (match) => match.toUpperCase()) // Convert spaces to camelCase
      .replace(/\s+/g, "") // Remove spaces
      .replace(/^[A-Z]/, (match) => match.toLowerCase()); // Ensure first letter is lowercase
  };

  if (!user)
    return <div className="text-center mt-5 text-danger">User not found!</div>;

  return loading ? (
    <FullPageSpinner loading={loading} />
  ) : (
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
          <Building className="icon" /> <strong>Campus:</strong>{" "}
          <span>{user.campus}</span>
        </div>
        <div className="profile-row">
          <GeoAltFill className="icon" /> <strong>Address:</strong>{" "}
          <span>{user.address}</span>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn update-btn" onClick={() => openDialog()}>
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
