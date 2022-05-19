import { SIGNIN_SUCCESS, SIGNIN_FAIL } from "../actions/types";

const initialState = {
  token: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        loading: false,
        user: payload.user,
      };
    case SIGNIN_FAIL:
      return { ...state, token: null, loading: false };
    default:
      return state;
  }
}
