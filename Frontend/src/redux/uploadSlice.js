import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const uploadImage = createAsyncThunk(
  'upload/uploadImage',
  async (file, { rejectWithValue }) => {
    try {
      // Simulate an API call to upload the image
      const formData = new FormData();
      formData.append('file', file);

      // Replace with your actual API call
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    image: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.image = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default uploadSlice.reducer;