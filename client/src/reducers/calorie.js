import {
  ADD_CALORIE,
  FETCH_CALORIE,
  ITEM_DETAIL,
  LOAD_FOODITEM,
} from "../actions/types";

const initialState = {
  calories: [],
  foodItems: [],
  itemDetail: null,
  loading: true,
  sum: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CALORIE:
      return {
        ...state,
        calories: [...state.calories, action.payload],
        sum: state.sum + action.payload.count,
        foodItems: [],
      };
    case FETCH_CALORIE:
      return {
        ...state,
        calories: action.payload.calories,
        sum: action.payload.sum,
        loading: false,
      };
    case LOAD_FOODITEM:
      return { ...state, foodItems: action.payload, loading: false };
    case ITEM_DETAIL:
      return { ...state, itemDetail: action.payload, loading: false };
    default:
      return state;
  }
}
