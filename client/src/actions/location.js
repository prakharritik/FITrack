const {
  START_RECORDING,
  STOP_RECORDING,
  ADD_CURR_LOCATION,
  ADD_LOCATION,
} = require("./types");

import fitnessAPI from "../api/fitnessAPI";

export const startRecording = () => (dispatch) => {
  dispatch({ type: START_RECORDING });
};

export const stopRecording = (locations) => async (dispatch) => {
  try {
    const res = await fitnessAPI.post("/walk", { locations });
    dispatch({ type: STOP_RECORDING });
  } catch (err) {
    console.log(err);
  }
};

const createTracks = (dispatch) => async (name, locations) => {};

export const addLocation = (location, recording) => (dispatch) => {
  dispatch({ type: ADD_CURR_LOCATION, payload: location });
  if (recording) {
    dispatch({ type: ADD_LOCATION, payload: location });
  }
};
