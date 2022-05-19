import { combineReducers } from "redux";

import auth from "./auth";
import profile from "./profile";
import calorie from "./calorie";
import post from "./post";
import location from "./location";

export default combineReducers({
  auth,
  profile,
  location,
  calorie,
  post,
});
