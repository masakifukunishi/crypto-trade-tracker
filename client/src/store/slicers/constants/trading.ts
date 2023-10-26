import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  TRADING_CONSTANT: {
    TRADING_TYPE: {
      BUY: { id: "", name: "" },
      SELL: { id: "", name: "" },
    },
  },
};

const constantTradingSlice = createSlice({
  name: "constant-trading",
  initialState,
  reducers: {
    setConstantTrading: (state, action) => {
      state.TRADING_CONSTANT = action.payload;
    },
    initializeConstantTrading: (state) => {
      state.TRADING_CONSTANT = initialState.TRADING_CONSTANT;
    },
  },
});

export const { setConstantTrading, initializeConstantTrading } = constantTradingSlice.actions;

export const selectConstantTrading = (state: RootState) => state.constantTrading.TRADING_CONSTANT;

export default constantTradingSlice.reducer;
