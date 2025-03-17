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
import { get, post } from "../services/api";

//Load user
export const loadUser = () => async (dispatch) => {
  try {
    const res = await get("/parents/me");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
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
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const res = await post("/auth/login", {
        usid: username,
        password: password,
      });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser()); // ✅ Internal function should be triggered
    } catch (err) {
      console.error("Login Error:", err);

      dispatch({
        type: "LOGIN_FAIL",
        payload: err.response?.data?.errors || "Something went wrong",
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
