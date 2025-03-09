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
