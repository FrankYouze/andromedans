import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { exoplanetApi } from './api/exoplanetApi';
import uiReducer from './slices/uiSlice';
import modelReducer from './slices/modelSlice';
import dataReducer from './slices/dataSlice';

export const store = configureStore({
  reducer: {
    [exoplanetApi.reducerPath]: exoplanetApi.reducer,
    ui: uiReducer,
    model: modelReducer,
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exoplanetApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

// Types are exported from ./types.ts to avoid circular dependencies
