import { configureStore } from "@reduxjs/toolkit";
import openedModalReducer from "./slicers/openedModal";
import constantTradingReducer from "./slicers/constants/trading";
import configReducer from "./slicers/config";

export const store = configureStore({
  reducer: {
    openedModal: openedModalReducer,
    constantTrading: constantTradingReducer,
    config: configReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
