import { configureStore } from '@reduxjs/toolkit';

const dummyReducer = (state = {}) => state;
 
export const store = configureStore({
  reducer: {
    dummy: dummyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;