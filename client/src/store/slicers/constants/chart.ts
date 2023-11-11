// src/store/chartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  CHART_CONSTANT: {
    CHART_PERIOD: {
      ONE_YEAR: {
        value: "",
        displayName: "",
      },
      YEAR_TO_DATE: {
        value: "",
        displayName: "",
      },
      SIX_MONTHS: {
        value: "",
        displayName: "",
      },
      ONE_MONTH: {
        value: "",
        displayName: "",
      },
    },
  },
};

const constantChartSlice = createSlice({
  name: "constant-chart",
  initialState,
  reducers: {
    setConstantChart: (state, action) => {
      state.CHART_CONSTANT = action.payload;
    },
    initializeConstantChart: (state) => {
      state.CHART_CONSTANT = initialState.CHART_CONSTANT;
    },
  },
});

export const { setConstantChart, initializeConstantChart } = constantChartSlice.actions;

export const selectChartConstant = (state: RootState) => state.constantChart.CHART_CONSTANT;

export default constantChartSlice.reducer;
