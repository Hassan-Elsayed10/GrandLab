// splashSlice.js
import { createSlice } from '@reduxjs/toolkit';

const splashSlice = createSlice({
  name: 'splash',
  initialState: {
    splashShown: true,
    boardingShown: true, // Flag to indicate whether the app should exit
  },
  reducers: {
    setSplashShown: (state, action) => {
      state.splashShown = action.payload;
    },
    setBoardingShown: (state, action) => {
      state.boardingShown = action.payload;
    },
  },
});

export const { setSplashShown, setBoardingShown } = splashSlice.actions;
export const selectSplashShown = (state) => state.splash.splashShown;
export const selectBoardingShown = (state) => state.splash.boardingShown;
export default splashSlice.reducer;
