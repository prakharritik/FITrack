import AsyncStorage from "@react-native-async-storage/async-storage";
import fitnessAPI from "../api/fitnessAPI.js";
import { SIGNIN_SUCCESS, SIGNIN_FAIL } from "../actions/types";

export const signin = (email, password) => async (dispatch) => {
  try {
    console.log(email);
    const res = await fitnessAPI.post("/auth/signin", { email, password });

    await AsyncStorage.setItem("token", res.data.token);

    dispatch({ type: SIGNIN_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: SIGNIN_FAIL });
  }
};
