import { ADD_CALORIE, FETCH_CALORIE } from "../actions/types";

const initialState = {
  calories: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CALORIE:
      return { ...state, calories: [...state.calories, action.payload] };
    case FETCH_CALORIE:
      return { ...state, calories: action.payload };
    default:
      return state;
  }
}
