import AsyncStorage from "@react-native-async-storage/async-storage";
import fitnessAPI from "../api/fitnessAPI.js";
import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";
import { navigate } from "../navigationRef.js";

export const signin = (email, password) => async (dispatch) => {
  try {
    const res = await fitnessAPI.post("/auth/signin", { email, password });

    await AsyncStorage.setItem("token", res.data.token);

    dispatch({ type: SIGNIN_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: SIGNIN_FAIL });
  }
};

export const localSignIn = () => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    try {
      const res = await fitnessAPI.post("/auth/verify", { token });
      dispatch({ type: SIGNIN_SUCCESS, payload: { token } });
      navigate("mainFlow");
    } catch (err) {
      navigate("Signin");
    }
  } else {
    navigate("Signin");
  }
};

export const signup = (email, password) => async (dispatch) => {
  try {
    const res = await fitnessAPI.post("/users/signup", { email, password });

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
    }
    dispatch({ type: REGISTER_FAIL });
  }
};
