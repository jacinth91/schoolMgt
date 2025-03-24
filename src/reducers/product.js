import {
  CART_FETCH_SUCCESS,
  CART_FETCH_UPDATE_FAIL,
  CART_LOADING_CHANGE,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_SUCCESS,
  PRODUCT_ADDED_CART,
  PRODUCT_CART_ADD_FAILED,
} from "../actions/types";

const initialState = {
  loading: true,
  cartId: null,
  parentId: null,
  items: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_ADDED_CART:
    case CART_FETCH_SUCCESS:
    case ITEM_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        cartId: payload.id,
        parentId: payload.parentId,
        items: payload.items,
        error: null,
      };
    case PRODUCT_CART_ADD_FAILED:
    case CART_FETCH_UPDATE_FAIL:
    case ITEM_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CART_LOADING_CHANGE:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
}
