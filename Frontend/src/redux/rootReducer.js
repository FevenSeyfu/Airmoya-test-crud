import { combineReducers } from 'redux';
import uploadReducer from './uploadSlice';
import authReducer from './authSlice';
import serviceReducer from './serviceSlice'; 

const rootReducer = combineReducers({
  upload: uploadReducer,
  auth: authReducer,
  services: serviceReducer, 
});

export default rootReducer;