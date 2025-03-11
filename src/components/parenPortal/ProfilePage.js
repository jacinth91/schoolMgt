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

const ProfilePage = () => {
  const { userId } = useParams(); // Get userId from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Commenting out API call for now
    /*
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    */

    // Dummy data for development
    setTimeout(() => {
      setUser({
        id: userId,
        name: "John Smith",
        email: "example@gmail.com",
        phone: "+91 111 222 3333",
        address: "Address 1, Address 2",
        profileImage: profileImg, // Placeholder image
      });
      setLoading(false);
    }, 1000); // Simulate API delay
  }, [userId]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!user)
    return <div className="text-center mt-5 text-danger">User not found!</div>;

  return (
    <div className="container profile-container">
      <div className="text-center">
        <img
          src={user.profileImage}
          alt="Profile"
          className="profile-image mx-auto"
        />
      </div>
      <hr />
      <h5 className="text-primary">Personal Details:</h5>

      <div className="profile-card">
        <div className="profile-row">
          <PersonFill className="icon" /> <strong>Full Name:</strong>{" "}
          <span>{user.name}</span>
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
        <button className="btn update-btn">Update & Save</button>
      </div>
    </div>
  );
};

export default ProfilePage;
