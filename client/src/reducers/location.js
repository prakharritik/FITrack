import {
  ADD_CURR_LOCATION,
  ADD_LOCATION,
  FETCH_WALK,
  START_RECORDING,
  STOP_RECORDING,
} from "../actions/types";

const initialState = {
  recording: false,
  locations: [],
  currentLocation: null,
  walks: [],
  sum: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CURR_LOCATION:
      return { ...state, currentLocation: action.payload };
    case START_RECORDING:
      return { ...state, recording: true };
    case STOP_RECORDING:
      return {
        ...state,
        recording: false,
        locations: [],
        walks: [...state.walks, action.payload],
        sum: state.sum + action.payload.distance,
      };
    case ADD_LOCATION:
      return { ...state, locations: [...state.locations, action.payload] };
    case FETCH_WALK:
      return { ...state, walks: action.payload.walks, sum: action.payload.sum };
    default:
      return state;
  }
}
