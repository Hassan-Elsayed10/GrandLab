import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'
import splashReducer from './splashSlice';
import languageReducer from './languageSlice'
import { dataReducer } from './resultSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    splash: splashReducer,
    language: languageReducer, 
    data: dataReducer,


  },
});
