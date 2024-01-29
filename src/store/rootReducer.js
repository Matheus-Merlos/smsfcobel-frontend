import { combineReducers } from 'redux';

import baseReducer, { menuChangeReducer } from './reducers';

export default combineReducers({
  reducer: baseReducer,
  menuChangeReducer,
});
