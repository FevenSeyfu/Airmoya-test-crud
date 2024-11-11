import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../Api/ApiRequest';

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (message, { rejectWithValue }) => {
    try {
      const response = await apiRequest('POST', 'messages/sendMessage', message);
      return {
        chat: response.chat,
        message: response.message,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await apiRequest('GET', `messages/${userId}`);
      return {
        chats: response.chats,
        message: response.message,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload.chat);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.chats;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearMessages } = chatSlice.actions;

export default chatSlice.reducer;