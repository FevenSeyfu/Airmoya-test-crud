import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../Api/ApiRequest';

const initialState = {
  services: [],
  status: 'idle',
  error: null,
};

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
  const response = await apiRequest('GET', 'services');
  return response;
});

export const addService = createAsyncThunk('services/addService', async (newService) => {
  const response = await apiRequest('POST', 'services', newService);
  return response;
});

export const updateService = createAsyncThunk('services/updateService', async ({ id, updatedService }) => {
  const response = await apiRequest('PUT', `services/${id}`, updatedService);
  return response;
});

export const deleteService = createAsyncThunk('services/deleteService', async (id) => {
  // Ensure no body is passed
  await apiRequest('DELETE', `services/${id}`);
  return id;
});

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.services.push(action.payload);
      })
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.services.findIndex(service => service.id === action.payload.id);
        state.services[index] = action.payload;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter(service => service.id !== action.payload);
      });
  },
});

export default serviceSlice.reducer;