import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
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

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const CheckoutWrapper = () => {
  const location = useLocation();
  const checkoutPaths = ["/cart", "/shipping", "/payment", "/checkout"];

  return checkoutPaths.includes(location.pathname) ? (
    <CheckoutSummary stepPaths={checkoutPaths} />
  ) : null;
};

const App = () => {
  // const location = useLocation();

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
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/product/:productId" element={<ProductDetail />} />
          <Route exact path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/children/:userId" element={<ChildrenDetails />} />

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
