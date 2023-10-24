import { configureStore } from "@reduxjs/toolkit";
import openedModalReducer from "./slicers/openedModal";

export const store = configureStore({
  reducer: {
    openedModal: openedModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
