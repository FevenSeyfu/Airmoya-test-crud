import { combineReducers } from 'redux';
import uploadReducer from './uploadSlice';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  upload: uploadReducer,
  auth: authReducer,
});

export default rootReducer;