import fitnessAPI from "../api/fitnessAPI";
import nutritionixAPI from "../api/nutritionixAPI";
import { navigate } from "../navigationRef";

import {
  ADD_CALORIE,
  CALORIE_ERROR,
  FETCH_CALORIE,
  ITEM_DETAIL,
  LOAD_FOODITEM,
} from "./types";

export const addCalorie = (name, count) => async (dispatch) => {
  try {
    console.log(name, count);
    const res = await fitnessAPI.post("/calorie", { count, item: name });
    dispatch({ type: ADD_CALORIE, payload: res.data });
    navigate("Addcalorie");
  } catch (err) {
    console.log(err);
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

export const getFoodItems = (item) => async (dispatch) => {
  try {
    const res = await nutritionixAPI.get("search/instant?branded=false", {
      params: { query: item },
    });

    dispatch({ type: LOAD_FOODITEM, payload: res.data.common });
  } catch (err) {
    console.log(err);
    dispatch({ type: CALORIE_ERROR });
  }
};

export const getFoodItemDetail = (item) => async (dispatch) => {
  try {
    console.log(item);
    const res = await nutritionixAPI.post("/natural/nutrients", {
      query: item,
    });
    console.log("action", res.data);
    dispatch({ type: ITEM_DETAIL, payload: res.data.foods[0] });
  } catch (err) {
    console.log(err.response.data);
    dispatch({ type: CALORIE_ERROR });
  }
};
