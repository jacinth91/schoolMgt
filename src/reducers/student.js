import { STUDENT_LOADED, STUDENT_LOAD_FAIL } from "../actions/types";

const initialState = {
  student: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case STUDENT_LOADED:
      return {
        ...state,
        student: payload,
      };
    case STUDENT_LOAD_FAIL:
      return {
        ...state,
        student: null,
      };
    default:
      return state;
  }
}
