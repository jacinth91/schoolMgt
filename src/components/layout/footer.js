import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer-container d-flex align-items-center justify-content-between p-3">
      <div className="footer-text">@ 2025 All rights reserved.</div>
      <div className="footer-links">
        <a href="/terms-of-service" className="footer-link">
          Terms of Service
        </a>{" "}
        |
        <a href="/privacy-policy" className="footer-link">
          Privacy Policy
        </a>{" "}
        |
        <a href="/refunds" className="footer-link">
          Refunds
        </a>{" "}
        |
        <a href="/cookie-preferences" className="footer-link">
          Cookie Preferences
        </a>
      </div>
    </footer>
  );
};

export default Footer;
