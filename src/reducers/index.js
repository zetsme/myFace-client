import { combineReducers } from 'redux';

import auth from './authReducers';
import posts from './postsReducers';

const reducer = combineReducers({ auth, posts });

export default reducer;
