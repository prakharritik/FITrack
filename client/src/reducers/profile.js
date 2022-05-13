import { GET_PROFILE, UPDATE_PROFILE } from "../actions/types";

const initialState = {
  loading: true,
  profile: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return { profile: payload, loading: false };
    default:
      return state;
  }
}
