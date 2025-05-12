import React, { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";

// Redux
import { Provider, useSelector } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

import "./App.css";
import Dashboard from "./components/parenPortal/dashboard";
import Footer from "./components/layout/footer";
import CheckoutSummary from "./components/parenPortal/checkoutSummary/CheckoutSummary";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProfilePage from "./components/parenPortal/ProfilePage";
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
import SupportQueries from "./components/admin/SupportQueries";
import AdminLogin from "./components/auth/AdminLogin";
import AdminManagement from "./components/admin/AdminManagement";

import { ToastContainer } from "react-toastify";
const ProductListing = lazy(() =>
  import("./components/parenPortal/products/productList")
);
const ChildrenDetails = lazy(() =>
  import("./components/parenPortal/children/ChildrenDetails")
);

const Layout = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  return (
    <>
      {loading && <FullPageSpinner loading={loading} />}
      {/* Show Navbar only if not on login page */}
      {isAuthenticated && !loading && <Navbar />}
      {children}
      {/* <CheckoutWrapper isAuthenticated={isAuthenticated} /> */}
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
      <ToastContainer />
      <Router>
        <Suspense fallback={<FullPageSpinner loading={true} />} />
        {/* <Fragment> */}
        {/* <Navbar /> */}
        <Layout>
          <Routes>
            <Route path="/" element={<AuthRedirect />} />
            <Route path="/login" element={<ParentLogin />} />
            <Route
              path="/admin/login"
              element={<AdminLogin userType={"Admin"} />}
            />
            <Route
              path="/vendor/login"
              element={<AdminLogin userType={"Vendor"} />}
            />

            {/* Private Routes for Authenticated Users */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/profile" element={<ProfilePage />} /> */}
            </Route>

            <Route element={<PrivateRoute allowedRoles={[ROLES.PARENT]} />}>
              <Route exact path="/products" element={<ProductListing />} />
              <Route path="/children" element={<ChildrenDetails />} />
              <Route path="/order/history" element={<OrderHistory />} />
              <Route path="/thankyou/:orderId" element={<ThankYouPage />} />
              <Route path="/support" element={<Support />} />

              <Route path="/cart" element={<CheckoutSummary />} />
              {/* <Route path="/payment" element={<CheckoutSummary />} /> */}
              <Route path="/checkout" element={<CheckoutSummary />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={[ROLES.ADMIN]} />}>
              <Route path="/admin/manage" element={<AdminManagement />} />
              <Route path="/admin/products" element={<ProductManagement />} />
              <Route path="/admin/students" element={<StudentManagement />} />
              <Route path="/admin/orders" element={<OrderManagement />} />
              <Route path="/admin/bundle" element={<BundleManagement />} />
              <Route path="/admin/support" element={<SupportQueries />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={[ROLES.VENDOR]} />}>
              <Route
                path="/vendor/manage"
                element={<AdminManagement vendor={true} />}
              />
              <Route path="/vendor/orders" element={<OrderManagement />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
