const {
  START_RECORDING,
  STOP_RECORDING,
  ADD_CURR_LOCATION,
  ADD_LOCATION,
  WALK_ERROR,
  FETCH_WALK,
} = require("./types");

import fitnessAPI from "../api/fitnessAPI";

export const getWalk = () => async (dispatch) => {
  try {
    const res = await fitnessAPI.get("/walk");
    console.log(res.data);
    dispatch({ type: FETCH_WALK, payload: res.data });
  } catch (err) {
    console.log(err.data.response);
    dispatch({ type: WALK_ERROR });
  }
};

export const startRecording = () => (dispatch) => {
  dispatch({ type: START_RECORDING });
};

export const stopRecording = (locations) => async (dispatch) => {
  try {
    const res = await fitnessAPI.post("/walk", { locations });
    dispatch({ type: STOP_RECORDING, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const addLocation = (location, recording) => (dispatch) => {
  dispatch({ type: ADD_CURR_LOCATION, payload: location });
  if (recording) {
    dispatch({ type: ADD_LOCATION, payload: location });
  }
};
