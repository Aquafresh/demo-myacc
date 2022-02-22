import { createSlice } from '@reduxjs/toolkit';

export interface IAuthStore {
  authedUser: null;
  loadingStore: boolean;
  error: string | null;
}

const initialState: IAuthStore = {
  authedUser: null,
  loadingStore: false,
  error: null,
};

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
});
