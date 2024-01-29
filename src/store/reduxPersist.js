import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'SMSFCOBEL',
      storage,
      whitelist: ['reducer', 'menuChangeReducer'],
    },
    reducers
  );

  return persistedReducers;
};
