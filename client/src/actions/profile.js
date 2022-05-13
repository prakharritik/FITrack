import { PROFILE_ERROR, GET_PROFILE, UPDATE_PROFILE } from "./types";
import fitnessAPI from "../api/fitnessAPI";
import { navigate } from "../navigationRef";

export const updateprofile = (profiledata) => async (dispatch) => {
  try {
    const res = await fitnessAPI.post("/profile", profiledata);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    navigate("Profile");
  } catch (err) {
    dispatch({ type: PROFILE_ERROR });
  }
};

export const getprofile = () => async (dispatch) => {
  try {
    const res = await fitnessAPI.get("/profile");
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: PROFILE_ERROR });
  }
};
