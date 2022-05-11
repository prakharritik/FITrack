const initialState = {
  token: null,
  loading: true,
  profile: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
}
