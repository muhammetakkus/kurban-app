import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth'
import kurum from './reducers/kurum.dashboard'
//import thunk from 'redux-thunk'

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER } from 'redux-persist';

// reducers
const reducers = combineReducers({
  auth: authReducer,
  kurum: kurum
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export default store;