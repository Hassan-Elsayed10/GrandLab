import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  data: [],
  count: 0,
  loading: false,
  error: null,
};

export const fetchIdAndData = createAsyncThunk(
  'data/fetchIdAndData',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const accessToken = JSON.parse(token);

      // Fetch user ID
      const idResponse = await axios.get('https://grandlabs-backend-patient.vercel.app/profile', {
        headers: {
          Authorization: accessToken,
        },
      });
      const userId = idResponse.data.user._id;

      // Fetch data using user ID
      const dataResponse = await axios.get(`https://grandlabs-backend-patient.vercel.app/results/user/${userId}`, {
        headers: {
          Authorization: accessToken,
        },
      });

      return dataResponse.data.results;
    } catch (error) {
      console.error(error); // Log error for debugging
      return rejectWithValue(error.response?.data || 'Error fetching data');
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdAndData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIdAndData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.count = action.payload.length;
      })
      .addCase(fetchIdAndData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});


export const dataReducer = dataSlice.reducer;

