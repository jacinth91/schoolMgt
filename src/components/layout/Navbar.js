import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Menu, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";
import { ROLES } from "../../utils/constants";

const Navbar = () => {
  const { parentName, role, cartData, name } = useSelector((state) => ({
    parentName: state.auth.user.parentName,
    role: state.auth.user.role,
    cartData: state.product.items,
    name: state.auth.user.name,
  }));
  const [showProfile, setShowProfile] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
        setActiveDropdown(null);
      }
    };

    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    if (activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile, activeDropdown]);

  const handleToggleNavbar = () => setShowNav((prev) => !prev);
  const handleNavItemClick = () => setShowNav(false);
  const logoutClick = () => dispatch(logout());

  const toggleDropdown = (menu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  const getNavItems = () => {
    switch (role) {
      case ROLES.PARENT:
        return [
          { path: "/dashboard", label: "Home" },
          { path: "/profile", label: "Profile" },
          { path: "/children", label: "My Children" },
          { path: "/products", label: "Products" },
          { path: "/order/history", label: "My Orders" },
          { path: "/support", label: "Support" },
        ];
      case ROLES.ADMIN:
        return [
          { path: "/dashboard", label: "Home" },
          { path: "/profile", label: "Profile" },
          {
            label: "User Management",
            submenu: [
              { path: "/admin/manage", label: "Member Management" },
              { path: "/admin/students", label: "Student Management" },
            ],
          },
          {
            label: "Operations Management",
            submenu: [
              { path: "/admin/bundle", label: "Bundle Management" },
              { path: "/admin/orders", label: "Order Management" },
              { path: "/admin/products", label: "Product Management" },
            ],
          },
          { path: "/admin/support", label: "Support Management" },
        ];
      case ROLES.VENDOR:
        return [
          { path: "/dashboard", label: "Home" },
          { path: "/profile", label: "Profile" },
          { path: "/vendor/manage", label: "Member Management" },
          { path: "/vendor/orders", label: "Order Management" },
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

          <button
            className="navbar-toggler text-white"
            type="button"
            onClick={handleToggleNavbar}
          >
            <Menu />
          </button>

          <div
            className={`collapse navbar-collapse ${showNav ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              {getNavItems().map((item, index) => (
                <li className="nav-item" key={index}>
                  {item.submenu ? (
                    <div className="dropdown">
                      <button
                        className="nav-link dropdown-toggle text-white border-0 bg-transparent"
                        onClick={() => toggleDropdown(item.label)}
                      >
                        {item.label}
                      </button>
                      {activeDropdown === item.label && (
                        <ul className="dropdown-menu show" ref={dropdownRef}>
                          {item.submenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                className="dropdown-item"
                                to={subItem.path}
                                onClick={() => setActiveDropdown(null)}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      className="nav-link text-white"
                      to={item.path}
                      onClick={handleNavItemClick}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              {role === ROLES.PARENT && (
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
                      {parentName ?? name}
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
