import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import sensorReducer from './sensorSlice';
export const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer,
     sensor: sensorReducer,
   
  },
})