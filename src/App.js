import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";
import Dashboard from "./components/parenPortal/dashboard";
import Footer from "./components/layout/footer";
import CheckoutSummary from "./components/parenPortal/checkoutSummary/CheckoutSummary";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Products from "./components/parenPortal/Products";
import ProductDetail from "./components/parenPortal/products/ProductDetail";
import ProfilePage from "./components/parenPortal/ProfilePage";
import ChildrenDetails from "./components/parenPortal/children/ChildrenDetails";
import OrderHistory from "./components/parenPortal/orders/OrderHistory";
import ProductManagement from "./components/admin/ProductManagement";
import ParentLogin from "./components/auth/ParentLogin";
import StudentManagement from "./components/admin/StudentManagement";
import OrderManagement from "./components/admin/OrderManagement";
import ThankYouPage from "./components/parenPortal/checkoutSummary/ThankyouPage";
import BundleManagement from "./components/admin/BundleManagement";
import Support from "./components/parenPortal/Support";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const CheckoutWrapper = () => {
  const location = useLocation();
  const checkoutPaths = ["/cart", "/payment", "/checkout"];

  return checkoutPaths.includes(location.pathname) ? (
    <CheckoutSummary stepPaths={checkoutPaths} />
  ) : null;
};

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        {/* <Fragment> */}
        {/* <Navbar /> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<ParentLogin />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/product/:productId" element={<ProductDetail />} />
          <Route exact path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/children/:userId" element={<ChildrenDetails />} />
          <Route path="/order/:userId" element={<OrderHistory />} />
          <Route path="/admin/products" element={<ProductManagement />} />
          <Route path="/admin/students" element={<StudentManagement />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route path="/thankyou" element={<ThankYouPage />} />
          <Route path="/admin/bundle" element={<BundleManagement />} />
          <Route path="/support" element={<Support />} />

          {/* <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} /> */}
        </Routes>
        {/* {checkoutPaths.includes(location.pathname) && (
          <CheckoutSummary stepPath={checkoutPaths} />
        )} */}
        <CheckoutWrapper />
        {/* </Fragment> */}
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
