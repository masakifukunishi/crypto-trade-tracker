import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const openedModal = createSlice({
  name: "openedModal",
  initialState: {
    modal: { type: "", param: {} as any },
  },
  reducers: {
    open: (state, action) => {
      state.modal = action.payload;
      document.body.style.overflow = "hidden";
    },
    close: (state) => {
      state.modal = { type: "", param: {} };
      document.body.style.overflow = "auto";
    },
  },
});

export const { open, close } = openedModal.actions;
export const selectOpenedModal = (state: RootState) => state.openedModal.modal;
export default openedModal.reducer;
