import {
  ADD_POST,
  DELETE_POST,
  FETCH_POSTS,
  UPDATE_LIKES,
  UPDATE_POST,
} from "../actions/types";

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

      return {
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
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    default:
      return state;
  }
}
