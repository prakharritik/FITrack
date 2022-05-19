import { ADD_POST, FETCH_POSTS, UPDATE_POST } from "../actions/types";

const initialState = {
  loading: true,
  posts: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_POST:
      return { posts: [...state.posts, payload], loading: false };
    case FETCH_POSTS:
      return { posts: payload, loading: false };
    case UPDATE_POST:
      const { title, text, image } = payload;
      //  console.log("ti", title);
      const st = {
        posts: state.posts.map((post) => {
          return post._id === payload._id
            ? {
                ...post,
                text: text,
                title: title,
                image: image ? image : null,
              }
            : post;
        }),
        loading: false,
      };
      // console.log("hello", st);
      return st;
    default:
      return state;
  }
}
