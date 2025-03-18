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
import { Provider, useSelector } from "react-redux";
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
import PrivateRoute from "./components/routing/PrivateRoute";
import { ROLES } from "./utils/constants";
import AuthRedirect from "./components/layout/AuthRedirect";
import FullPageSpinner from "./components/layout/FullPageSpinner";

const CheckoutWrapper = ({ isAuthenticated }) => {
  const location = useLocation();
  const checkoutPaths = ["/cart", "/payment", "/checkout"];

  return checkoutPaths.includes(location.pathname) && isAuthenticated ? (
    <CheckoutSummary stepPaths={checkoutPaths} />
  ) : null;
};

const Layout = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  return (
    <>
      {loading && <FullPageSpinner loading={loading} />}
      {/* Show Navbar only if not on login page */}
      {isAuthenticated && !loading && <Navbar />}
      {children}
      <CheckoutWrapper isAuthenticated={isAuthenticated} />
      {isAuthenticated && !loading && <Footer />}
    </>
  );
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
        <Layout>
          <Routes>
            <Route path="/" element={<AuthRedirect />} />
            <Route path="/login" element={<ParentLogin />} />

            {/* Private Routes for Authenticated Users */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={[ROLES.PARENT]} />}>
              <Route path="/products" element={<Products />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/children" element={<ChildrenDetails />} />
              <Route path="/order/history" element={<OrderHistory />} />
              <Route path="/thankyou" element={<ThankYouPage />} />
              <Route path="/support" element={<Support />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={[ROLES.ADMIN]} />}>
              <Route path="/admin/products" element={<ProductManagement />} />
              <Route path="/admin/students" element={<StudentManagement />} />
              <Route path="/admin/orders" element={<OrderManagement />} />
              <Route path="/admin/bundle" element={<BundleManagement />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
