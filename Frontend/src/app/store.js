import { configureStore } from '@reduxjs/toolkit';
import adminAuthReducer from '../features/auth/adminAuthSlice'
import userAuthReducer from '../features/auth/userAuthSlice'


export const store = configureStore({
  reducer: {
    adminAuth:adminAuthReducer,
    userAuth:userAuthReducer
  },
});
