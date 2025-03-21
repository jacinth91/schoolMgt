import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-container d-flex align-items-center justify-content-between p-3">
      <div className="footer-text">@ 2025 All rights reserved.</div>
      <div className="footer-links">
        <Link to="/terms-of-service" className="footer-link">
          Terms of Service
        </Link>{" "}
        |
        <Link to="/privacy-policy" className="footer-link">
          Privacy Policy
        </Link>{" "}
        |
        <Link to="/refunds" className="footer-link">
          Refunds
        </Link>{" "}
        |
        <Link to="/cookie-preferences" className="footer-link">
          Cookie Preferences
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
