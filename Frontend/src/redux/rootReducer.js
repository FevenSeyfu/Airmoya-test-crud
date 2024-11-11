import { combineReducers } from 'redux';
import uploadReducer from './uploadSlice';
import authReducer from './authSlice';
import serviceReducer from './serviceSlice'; 
import chatReducer from './chatSlice';

const rootReducer = combineReducers({
  upload: uploadReducer,
  auth: authReducer,
  services: serviceReducer, 
  chat: chatReducer,
});

export default rootReducer;