import { combineReducers } from 'redux';

import { authSlice } from './auth/authSlice';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

export type rootStore = ReturnType<typeof rootReducer>;
