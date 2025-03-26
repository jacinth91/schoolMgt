import { toast } from "react-toastify";
import { del, get, post } from "../services/api";
import {
  CART_FETCH_SUCCESS,
  CART_FETCH_UPDATE_FAIL,
  CART_LOADING_CHANGE,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_SUCCESS,
  ORDER_PLACED_SUCCESSFULLY,
  ORDER_PLACEMENT_FAIL,
  PRODUCT_ADDED_CART,
  PRODUCT_CART_ADD_FAILED,
} from "./types";

export const fetchLinkedBundles = async (usid, type) => {
  try {
    const res = await get(`/bundles/search/${usid}?type=${type}`);
    return res.data;
  } catch (error) {
    toast.error(error.message, { position: "top-right" });
    return error;
  }
};

export const fetchAllBundles = async () => {
  try {
    const res = await get("/bundles");
    return res.data;
  } catch (error) {
    toast.error(error.message, { position: "top-right" });
    return error;
  }
};

export const fetchAllProducts = async () => {
  try {
    const res = await get("/products");
    return res.data;
  } catch (error) {
    toast.error(error.message, { position: "top-right" });
    return error;
  }
};

export const addToCart =
  ({ bundleId, quantity, parentId }) =>
  async (dispatch) => {
    try {
      const res = await post("/cart/bundles", { bundleId, quantity, parentId });
      dispatch({
        type: PRODUCT_ADDED_CART,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (error) {
      dispatch({
        type: PRODUCT_CART_ADD_FAILED,
        payload: error,
      });
      return Promise.reject(error);
    }
  };

export const getCartDetail = (parentId) => async (dispatch) => {
  try {
    const res = await get(`/cart/${parentId}`);
    dispatch({
      type: CART_FETCH_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CART_FETCH_UPDATE_FAIL,
      payload: error,
    });
  }
};

export const deleteCartItem =
  ({ parentId, bundleId }) =>
  async (dispatch) => {
    try {
      const res = await del(`/cart/${parentId}/bundles/${bundleId}`);
      dispatch({
        type: ITEM_DELETE_SUCCESS,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (error) {
      dispatch({
        type: ITEM_DELETE_FAIL,
        payload: error,
      });
      return Promise.reject(error);
    }
  };

export const loadingCartChange = (value) => (dispatch) => {
  dispatch({ type: CART_LOADING_CHANGE, payload: value });
};

export const orderPlaced =
  ({ parentId, paymentMethod }) =>
  async (dispatch) => {
    try {
      const res = await post("/orders/cart", { parentId, paymentMethod });
      dispatch({
        type: ORDER_PLACED_SUCCESSFULLY,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (error) {
      dispatch({
        type: ORDER_PLACEMENT_FAIL,
        payload: error,
      });
      return Promise.reject(error);
    }
  };

export const fetchAllOrders = async () => {
  try {
    const res = await get("/orders");
    return res.data;
  } catch (error) {
    toast.error(error.message, { position: "top-right" });
    return error;
  }
};
