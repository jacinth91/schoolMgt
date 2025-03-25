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
import { reverseTransform, transform } from "../../services/helper";

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

  const openDialog = () => {
    if (!user || typeof user !== "object") return [];

    // Define which fields are editable
    const nonEditableFields = ["id", "role", "campus", "password"];
    const skipKeys = ["students", "role", "gender", "studentData", "password"];

    // Transform parent-level data dynamically
    const result = transform(user, skipKeys, nonEditableFields);
    setFormData(result);
    setShowPopup(true);
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
          <TelephoneFill className="icon" /> <strong>Mobile:</strong>{" "}
          <span>{user.phoneNumber}</span>
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

      <div className="text-center mt-4 mx-auto">
        <button className="btn update-btn w-100" onClick={() => openDialog()}>
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
