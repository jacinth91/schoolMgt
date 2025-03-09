import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, Menu } from "lucide-react";

const Navbar = () => {
  return (
    <div className="banner align-items-center justify-content-center text-white">
      <nav className="navbar z-10 absolute top-0 w-full navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <BarChart3 className="me-2" />
            Dashboard
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <Menu />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/analytics">
                  Analytics
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/reports">
                  Reports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/settings">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="welcome-wrapper align-content-end">
        <div className="px-4 py-3 w-50 welcome-box">
          <div className="ps-5 ms-3">
            <h3>Why Parents Choose Our Software</h3>
            <p>
              We believe every business should be able to manage their work
              processes with innovative, custom-built software.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
