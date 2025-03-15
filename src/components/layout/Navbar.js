import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, Menu, UserPlus } from "lucide-react";

const Navbar = ({ userRole }) => {
  const getNavItems = () => {
    //add props to get user role
    switch ("parent") {
      case "parent":
        return [
          { path: "/dashboard", label: "Home" },
          { path: "/profile/id", label: "Profile" },
          { path: "/children/id", label: "Children" },
          { path: "/products", label: "Products" },
          { path: "/cart", label: "Cart" },
          { path: "/support", label: "Support" },
        ];
      case "admin":
        return [
          { path: "/dashboard", label: "Home" },
          { path: "/profile", label: "Member Managment" },
          { path: "/children", label: "Student Management" },
          { path: "/products", label: "Bundle Management" },
          { path: "/cart", label: "Orders" },
          { path: "/support", label: "Product Management" },
        ];
      case "vendor":
        return [
          { path: "/dashboard", label: "Home" },
          { path: "/products", label: "Profile" },
          { path: "/orders", label: "Memeber Managemnt" },
          { path: "/settings", label: "Order Mangement" },
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
              {userRole === "parent" && (
                <li>
                  <button className="add-child-button">
                    <UserPlus className="button-icon" />
                    <span>Add Child</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* <div className="welcome-wrapper align-content-end">
        <div className="px-4 py-3 w-50 welcome-box">
          <div className="ps-5 ms-3">
            <h3>Why Parents Choose Our Software</h3>
            <p>
              We believe every business should be able to manage their work
              processes with innovative, custom-built software.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;
