import {
  CREATE_POST,
  SET_CURRENT_POST_ID,
  DELETE_POST,
  GET_POSTS,
  REMOVE_CURRENT_POST_ID,
  UPDATE_POST,
} from '../constants/actionTypes';
import * as api from '../api';

export const createPost = (postData) => async (dispatch) => {
  try {
    const { data } = await api.createPost(postData);
    dispatch({ type: CREATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getPosts();
    dispatch({ type: GET_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE_POST, payload: id });
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = (id, postData) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, postData);
    dispatch({ type: UPDATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: UPDATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const setCurrentPostId = (id) => (dispatch) => {
  dispatch({ type: SET_CURRENT_POST_ID, payload: id });
};
export const removeCurrentPostId = () => (dispatch) => {
  dispatch({ type: REMOVE_CURRENT_POST_ID });
};
