import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('userInfo', JSON.stringify(action.data));
      return { ...state, ...action.data };
    case LOGOUT:
      localStorage.clear();
      return {};

    default:
      return state;
  }
};

export default authReducer;
