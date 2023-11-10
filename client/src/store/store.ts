import { configureStore } from "@reduxjs/toolkit";
import openedModalReducer from "./slicers/openedModal";
import constantTradingReducer from "./slicers/constants/trading";
import configReducer from "./slicers/config";
import commoReducer from "./slicers/common";
import chartReducer from "./slicers/chart";

export const store = configureStore({
  reducer: {
    openedModal: openedModalReducer,
    constantTrading: constantTradingReducer,
    config: configReducer,
    common: commoReducer,
    chart: chartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
