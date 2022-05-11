import AsyncStorage from "@react-native-async-storage/async-storage";
import fitnessAPI from "../api/fitnessAPI.js";
import { SIGNIN_SUCCESS, SIGNIN_FAIL } from "../actions/types";
import { navigate } from "../navigationRef.js";

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

export const localSignIn = () => async (dispatch) => {
  await AsyncStorage.removeItem("token");
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: SIGNIN_SUCCESS, payload: { token } });
    navigate("mainFlow");
  } else {
    navigate("Signin");
  }
};
