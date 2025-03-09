import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";
import PrivateRoute from "./components/routing/PrivateRoute";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";
import Dashboard from "./components/parenPortal/dashboard";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        {/* <Fragment> */}
         {/* <Navbar /> */}
          <Routes>
            <Route exact path="/dashboard" element={<Dashboard />} />
            {/* <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} /> */}
          </Routes>
        {/* </Fragment> */}
      </Router>
    </Provider>
  );
};

export default App;
