import fitnessAPI from "../api/fitnessAPI";
import { navigate } from "../navigationRef";
import {
  ADD_POST,
  DELETE_POST,
  FETCH_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  UPDATE_POST,
} from "./types";

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

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await fitnessAPI.get(`post/${id}`);
    // console.log(res.data, "action");
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
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

export const addLike = (id) => async (dispatch) => {
  try {
    console.log(id);
    const res = await fitnessAPI.put(`post/like/${id}`);
    console.log(res.data);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await fitnessAPI.put(`post/unlike/${id}`);
    console.log(res.data);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await fitnessAPI.delete(`post/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
