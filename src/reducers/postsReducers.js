import {
  CREATE_POST,
  GET_POSTS,
  DELETE_POST,
  SET_CURRENT_POST_ID,
  REMOVE_CURRENT_POST_ID,
  UPDATE_POST,
} from '../constants/actionTypes';

const postsReducer = (state = { postCards: [], currentPostId: null }, action) => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, postCards: [...action.payload] };
    case CREATE_POST:
      return { ...state, postCards: [...state.postCards, action.payload] };
    case DELETE_POST:
      return { ...state, postCards: state.postCards.filter((post) => post._id !== action.payload) };
    case UPDATE_POST:
      return {
        ...state,
        postCards: state.postCards.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case SET_CURRENT_POST_ID:
      return { ...state, currentPostId: action.payload };
    case REMOVE_CURRENT_POST_ID:
      return { ...state, currentPostId: null };
    default:
      return state;
  }
};

export default postsReducer;
