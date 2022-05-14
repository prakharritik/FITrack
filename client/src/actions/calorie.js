import fitnessAPI from "../api/fitnessAPI";
import { ADD_CALORIE, CALORIE_ERROR, FETCH_CALORIE } from "./types";

export const addCalorie = (count) => async (dispatch) => {
  try {
    const res = await fitnessAPI.post("/calorie", { count });
    dispatch({ type: ADD_CALORIE, payload: res.data });
  } catch (err) {
    dispatch({ type: CALORIE_ERROR });
  }
};

export const getCalorie = () => async (dispatch) => {
  try {
    const res = await fitnessAPI.get("/calorie");
    dispatch({ type: FETCH_CALORIE, payload: res.data });
  } catch (err) {
    dispatch({ type: CALORIE_ERROR });
  }
};
