import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  selectedCoin: "",
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setSelectedCoin: (state, action) => {
      state.selectedCoin = action.payload;
    },
  },
});

export const { setSelectedCoin } = commonSlice.actions;

export const selectSelectedCoin = (state: RootState) => state.common.selectedCoin;

export default commonSlice.reducer;
