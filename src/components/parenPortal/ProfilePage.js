import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfilePage.css";
import {
  PersonFill,
  TelephoneFill,
  GeoAltFill,
  Building,
} from "react-bootstrap-icons";
import profileImg from "../../images/profilepic.jpg";
import PopupDialog from "../layout/PopupDialog";
import { useDispatch, useSelector } from "react-redux";
import FullPageSpinner from "../layout/FullPageSpinner";
import { loadingChange, updateProfile } from "../../actions/auth";
import { reverseTransform, transform } from "../../services/helper";
import { ROLES } from "../../utils/constants";
import { Mail } from "lucide-react";

const ProfilePage = () => {
  const { user, loading } = useSelector((state) => state.auth);

  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();

  const handleSave = (updatedData) => {
    dispatch(loadingChange(true));
    setFormData(updatedData);
    const apiBody = reverseTransform(formData);
    console.log({ ...user, ...apiBody });
    dispatch(updateProfile({ ...user, ...apiBody }));
    setShowPopup(false);
  };

  const openDialog = () => {
    if (!user || typeof user !== "object") return [];

    // Define which fields are editable
    const nonEditableFields = ["role", "campus", "password"];
    const skipKeys = [
      "id",
      "students",
      "role",
      "gender",
      "studentData",
      "password",
      "otp",
      "otpExpiresAt",
      "isOtpVerified",
    ];

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
        <img src={profileImg} alt="Profile" className="profile-image mx-auto" />
      </div>
      <hr />
      <h5 className="text-primary">Personal Details:</h5>

      <div className="profile-card">
        <div className="profile-row">
          <PersonFill className="icon" /> <strong>Full Name:</strong>{" "}
          <span>{user.parentName ?? user.name}</span>
        </div>
        <div className="profile-row">
          <TelephoneFill className="icon" /> <strong>Mobile:</strong>{" "}
          <span>{user.phoneNumber}</span>
        </div>
        {user.role === ROLES.PARENT && (
          <>
            <div className="profile-row">
              <Building className="icon" /> <strong>Campus:</strong>{" "}
              <span>{user.campus}</span>
            </div>
            <div className="profile-row">
              <GeoAltFill className="icon" /> <strong>Address:</strong>{" "}
              <span>{user.address}</span>
            </div>
          </>
        )}
        {(user.role === ROLES.ADMIN || user.role === ROLES.VENDOR) && (
          <>
            <div className="profile-row">
              <Mail className="icon" /> <strong>Email:</strong>{" "}
              <span>{user.email}</span>
            </div>
          </>
        )}
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
