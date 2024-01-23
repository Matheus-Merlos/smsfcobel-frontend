import { persistStore } from 'redux-persist';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import persistedReducer from './reduxPersist';
import rootSaga from './rootSaga';

import reducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer(reducer),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
