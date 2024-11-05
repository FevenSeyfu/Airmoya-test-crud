import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../Api/ApiRequest';
import { setItem, getItem } from '../utils/localStorage';

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await apiRequest('POST', 'auth/register', userData);
    const user = { id: response.userId, username: userData.username, email: userData.email }; // Assuming response has userId
    setItem('userInfo', { token: response.token, user });
    return { user, token: response.token }; 
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await apiRequest('POST', 'auth/login', userData);
    const user = { email: userData.email, password: userData.password };
    setItem('userInfo', { token: response.token, user:response.user });
    return { user:response.user, token: response.token,message:response.message };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const rehydrateState = () => {
  const userInfo = getItem('userInfo');
  return userInfo ? { user: userInfo.user, loading: false, error: null } : initialState;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: rehydrateState(),
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('userInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || action.payload.message || 'Registration failed';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || action.payload.message || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;