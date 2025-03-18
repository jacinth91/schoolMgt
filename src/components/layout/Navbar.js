import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Menu, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = () => {
  const { parentName, role } = useSelector((state) => state.auth.user);
  const [showProfile, setShowProfile] = useState(false);
  const dispacth = useDispatch();

  const logoutClick = () => {
    dispacth(logout());
  };

  const getNavItems = () => {
    switch (role) {
      case "parent":
        return [
          { path: "/dashboard", label: "Home" },
          { path: "/profile", label: "Profile" },
          { path: "/children/id", label: "Children" },
          { path: "/products", label: "Products" },
          { path: "/cart", label: "Cart" },
          { path: "/support", label: "Support" },
        ];
      case "admin":
        return [
          { path: "/dashboard", label: "Home" },
          { path: "/profile", label: "Member Management" },
          { path: "/children", label: "Student Management" },
          { path: "/products", label: "Bundle Management" },
          { path: "/cart", label: "Orders" },
          { path: "/support", label: "Product Management" },
        ];
      case "vendor":
        return [
          { path: "/dashboard", label: "Home" },
          { path: "/products", label: "Profile" },
          { path: "/orders", label: "Member Management" },
          { path: "/settings", label: "Order Management" },
        ];
      default:
        return [{ path: "/", label: "Home" }];
    }
  };

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
              {getNavItems().map((item, index) => (
                <li className="nav-item" key={index}>
                  <Link className="nav-link" to={item.path}>
                    {item.label}
                  </Link>
                </li>
              ))}
              {/* Profile Dropdown */}
              <li className="nav-item position-relative ps-3 pt-2">
                <button
                  className="profile-button d-flex align-items-center justify-content-center border-0 bg-transparent"
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <User size={24} className="text-white" />
                </button>
                {showProfile && (
                  <div
                    className="profile-dropdown position-absolute bg-white shadow-lg rounded p-3 mt-2 end-0"
                    style={{ minWidth: "200px", zIndex: 1000 }}
                  >
                    <p className="mb-2 fw-bold text-center text-dark">
                      {parentName}
                    </p>
                    <hr className="m-2" />
                    <button
                      className="btn btn-danger w-100 text-center"
                      onClick={logoutClick}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
