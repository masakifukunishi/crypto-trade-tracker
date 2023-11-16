import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  period: "",
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setChartPeriod: (state, action) => {
      state.period = action.payload;
    },
  },
});

export const { setChartPeriod } = chartSlice.actions;

export const selectChartPeriod = (state: RootState) => state.chart.period;

export default chartSlice.reducer;
