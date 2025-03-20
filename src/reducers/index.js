import { combineReducers } from "redux";
import auth from "./auth";
import student from "./student";

export default combineReducers({
  auth,
  student,
});
