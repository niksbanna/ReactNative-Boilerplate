import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StorageService } from '../../services/storage';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      // Clear storage
      StorageService.clearAuth();
    },
  },
});

export const { setUser, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;
