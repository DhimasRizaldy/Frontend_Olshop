import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducer'; // Pastikan Anda mengimpor reducer Anda

const rootReducer = combineReducers({
  authUser: authReducer,
});

export default rootReducer;
