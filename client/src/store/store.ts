import { configureStore } from "@reduxjs/toolkit";
import openedModalReducer from "./slicers/openedModal";
import constantTradingReducer from "./slicers/constants/trading";

export const store = configureStore({
  reducer: {
    openedModal: openedModalReducer,
    constantTrading: constantTradingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
