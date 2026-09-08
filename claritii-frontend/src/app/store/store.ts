import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    // auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for RTK Query and non-serializable data
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;