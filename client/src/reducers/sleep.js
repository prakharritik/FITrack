import { ADD_SLEEP, FETCH_SLEEP } from "../actions/types";

const initialState = {
  sleeps: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_SLEEP:
      return { ...state, sleeps: [...state.sleeps, action.payload] };
    case FETCH_SLEEP:
      return { ...state, sleeps: action.payload };
    default:
      return state;
  }
}
