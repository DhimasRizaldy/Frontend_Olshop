import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Ensure you import your reducer

const rootReducer = combineReducers({
  authUser: authReducer,
  // Add other reducers here
});

export default rootReducer;
