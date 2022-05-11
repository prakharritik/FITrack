import thunk from "redux-thunk";
import rootreducer from "./reducers/index";
import { createStore, applyMiddleware } from "redux";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootreducer,
  initialState,
  applyMiddleware(...middleware)
);
export default store;
