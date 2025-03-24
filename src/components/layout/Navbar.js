import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Menu, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = () => {
  const { parentName, role, cartData } = useSelector((state) => ({
    parentName: state.auth.user.parentName,
    role: state.auth.user.role,
    cartData: state.product.items,
  }));
  const [showProfile, setShowProfile] = useState(false);
  const [showNav, setShowNav] = useState(false); // <-- Added state to control navbar visibility
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  const handleToggleNavbar = () => {
    setShowNav((prev) => !prev);
  };

  const handleNavItemClick = () => {
    setShowNav(false); // Close navbar on link click
  };

  const logoutClick = () => {
    dispatch(logout());
  };

  const getNavItems = () => {
    switch (role) {
      case "parent":
        return [
          { path: "/dashboard", label: "Home" },
          { path: "/profile", label: "Profile" },
          { path: "/children", label: "Children" },
          { path: "/products", label: "Products" },
          { path: "/order/history", label: "Orders" },
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
      <nav className="navbar z-10 absolute top-0 w-full navbar-expand-lg position-sticky">
        <div className="container">
          <Link
            className="navbar-brand d-flex align-items-center text-white"
            to="/"
          >
            <BarChart3 className="me-2" />
            Dashboard
          </Link>

          {/* Navbar Toggler */}
          <button
            className="navbar-toggler text-white"
            type="button"
            onClick={handleToggleNavbar}
          >
            <Menu />
          </button>

          {/* Navbar Items */}
          <div
            className={`collapse navbar-collapse ${showNav ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              {getNavItems().map((item, index) => (
                <li className="nav-item" key={index}>
                  <Link
                    className="nav-link text-white"
                    to={item.path}
                    onClick={handleNavItemClick}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              {role === "parent" && (
                <li className="nav-item position-relative ps-3 pt-2">
                  <Link to="/cart">
                    <em className="bi bi-cart text-white"></em>
                    {!!cartData?.length && (
                      <span
                        className="badge rounded-pill bg-danger"
                        style={{ fontSize: "0.75rem", padding: "4px 8px" }}
                      >
                        {cartData?.length}
                      </span>
                    )}
                  </Link>
                </li>
              )}

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
                    ref={dropdownRef}
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
