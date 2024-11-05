import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../Api/ApiRequest';

export const uploadImage = createAsyncThunk(
  'upload/uploadImage',
  async ({ file, userId }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('userId', userId); 

      const response = await apiRequest('POST', 'images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchImages = createAsyncThunk(
  'upload/fetchImages',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiRequest('GET', `images/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  images: [],
  status: 'idle',
  error: null,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images.push(action.payload.file);
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default uploadSlice.reducer;