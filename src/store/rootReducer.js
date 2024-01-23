import { combineReducers } from 'redux';

import baseReducer from './reducers';

export default combineReducers({
  reducer: baseReducer,
});
