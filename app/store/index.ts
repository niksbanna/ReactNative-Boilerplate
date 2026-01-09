import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { postsApi } from './services/posts';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(postsApi.middleware),
});

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
