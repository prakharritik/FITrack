import {
  ADD_CURR_LOCATION,
  ADD_LOCATION,
  START_RECORDING,
  STOP_RECORDING,
} from "../actions/types";

const initialState = {
  recording: false,
  locations: [],
  currentLocation: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CURR_LOCATION:
      return { ...state, currentLocation: action.payload };
    case START_RECORDING:
      return { ...state, recording: true };
    case STOP_RECORDING:
      return { ...state, recording: false, locations: [] };
    case ADD_LOCATION:
      return { ...state, locations: [...state.locations, action.payload] };

    default:
      return state;
  }
}
