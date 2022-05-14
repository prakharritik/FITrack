import fitnessAPI from "../api/fitnessAPI";
import { ADD_SLEEP, FETCH_SLEEP, SLEEP_ERROR } from "./types";

export const addSleep = (duration) => async (dispatch) => {
  try {
    const res = await fitnessAPI.post("/sleep", { duration });
    dispatch({ type: ADD_SLEEP, payload: res.data });
  } catch (err) {
    dispatch({ type: SLEEP_ERROR });
  }
};

export const getSleep = () => async (dispatch) => {
  try {
    const res = await fitnessAPI.get("/sleep");
    dispatch({ type: FETCH_SLEEP, payload: res.data });
  } catch (err) {
    dispatch({ type: SLEEP_ERROR });
  }
};
