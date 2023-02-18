import { configureStore } from '@reduxjs/toolkit';
import adminAuthReducer from '../features/auth/adminAuthSlice'
import userAuthReducer from '../features/auth/userAuthSlice'
import userOTPReducer from '../features/auth/otpLoginSlice'


export const store = configureStore({
  reducer: {
    adminAuth:adminAuthReducer,
    userAuth:userAuthReducer,
    userOTPLogin:userOTPReducer
  },
});
