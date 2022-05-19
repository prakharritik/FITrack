import fitnessAPI from "../api/fitnessAPI";
import { navigate } from "../navigationRef";
import { ADD_POST, FETCH_POSTS, POST_ERROR, UPDATE_POST } from "./types";

export const addPost = (title, text, image) => async (dispatch) => {
  try {
    console.log(title, text, image);

    const res = await fitnessAPI.post("/post", { title, text, image });
    dispatch({ type: ADD_POST, payload: res.data });
    navigate("Viewposts");
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
    });
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const res = await fitnessAPI.get("/post");
    dispatch({ type: FETCH_POSTS, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
    });
  }
};

export const editPost = (title, text, image, id) => async (dispatch) => {
  try {
    const res = await fitnessAPI.put("/post", { title, text, image, id });
    console.log("payload", res.data);
    dispatch({ type: UPDATE_POST, payload: res.data });
    navigate("Viewposts");
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
    });
  }
};
