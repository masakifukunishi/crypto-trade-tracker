import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  currencyPair: "",
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCurrencyPair: (state, action) => {
      state.currencyPair = action.payload;
    },
  },
});

export const { setCurrencyPair } = commonSlice.actions;

export const selectCurrencyPair = (state: RootState) => state.common.currencyPair;

export default commonSlice.reducer;
