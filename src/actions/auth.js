import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOADING_CHANGE,
  USER_UPDATED,
  USER_UPDATE_FAILED,
} from "./types";
import { get, post, put } from "../services/api";

//Load user
export const loadUser = () => async (dispatch) => {
  try {
    const res = await get("/parents/me/021557");

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
        payload: res,
      });

      dispatch(loadUser()); // ✅ Internal function should be triggered
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err || "Something went wrong",
      });
    }
  };

export const loadingChange = (value) => (dispatch) => {
  dispatch({ type: LOADING_CHANGE, payload: value });
};

export const updateProfile = (data) => async (dispatch) => {
  try {
    const res = await put(`/profiles/${data?.id}?role=${data?.role}`, data);
    dispatch({ type: USER_UPDATED, payload: res.data });
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAILED, payload: error });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
