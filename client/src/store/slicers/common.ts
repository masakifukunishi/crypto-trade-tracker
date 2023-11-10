import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  coin: "",
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCoin: (state, action) => {
      state.coin = action.payload;
    },
  },
});

export const { setCoin } = commonSlice.actions;

export const selectCoin = (state: RootState) => state.common.coin;

export default commonSlice.reducer;
