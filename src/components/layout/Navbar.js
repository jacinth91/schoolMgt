import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, Menu } from "lucide-react";

const Navbar = () => {
  return (
    <div className="banner d-flex align-items-center justify-content-center text-white">
      <div className="text-center">
        <h1 className="display-4 fw-bold">Welcome to Your Dashboard</h1>
        <p className="lead">Monitor your business metrics in real-time</p>
      </div>
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
    </div>
  );
};

export default Navbar;
