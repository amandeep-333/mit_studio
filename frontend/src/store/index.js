import { configureStore } from '@reduxjs/toolkit';
import designReducer from './design.slice';

export const store = configureStore({
  reducer: {
    design: designReducer,
  },
});
