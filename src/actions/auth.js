import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    // const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {},
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });
    try {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {},
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
