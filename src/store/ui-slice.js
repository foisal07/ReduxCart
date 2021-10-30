import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartIsShown: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggle(state) {
      state.cartIsShown = !state.cartIsShown;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
