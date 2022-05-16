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
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CALORIE:
      return {
        ...state,
        calories: [...state.calories, action.payload],
        foodItems: [],
      };
    case FETCH_CALORIE:
      return { ...state, calories: action.payload };
    case LOAD_FOODITEM:
      return { ...state, foodItems: action.payload };
    case ITEM_DETAIL:
      return { ...state, itemDetail: action.payload, loading: false };
    default:
      return state;
  }
}
