import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../Api/ApiRequest";
import { setItem, getItem } from "../utils/localStorage";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiRequest("POST", "auth/register", userData);
      const user = {
        id: response.userId,
        username: userData.username,
        email: userData.email,
      };
      setItem("userInfo", { token: response.token, user });
      return { user, token: response.token };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiRequest("POST", "auth/login", userData);
      const user = { email: userData.email, password: userData.password };
      setItem("userInfo", { token: response.token, user: response.user });
      return {
        user: response.user,
        token: response.token,
        message: response.message,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest("GET", "auth/users");
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const initialState = {
  user: null,
  userList: [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState, 
  reducers: {
    logout: (state) => {
      state.user = null;
      state.userList = [];
      state.loading = false;
      state.error = null;
      localStorage.removeItem("userInfo");
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
        state.error =
          action.payload.error ||
          action.payload.message ||
          "Registration failed";
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
        state.error =
          action.payload.error || action.payload.message || "Login failed";
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;