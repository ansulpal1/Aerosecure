import { createSlice } from "@reduxjs/toolkit";

const sensorSlice = createSlice({
  name: "sensor",
  initialState: {
    sensorData: null,
     alarmActive:false,
  },
  reducers: {
    setSensorData: (state, action) => {
      state.sensorData = action.payload;
    },
    setAlarmActive: (state, action) => {
    state.alarmActive = action.payload;
  },
  },
});

export const { setSensorData,setAlarmActive } = sensorSlice.actions;
export default sensorSlice.reducer;
