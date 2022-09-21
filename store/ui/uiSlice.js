import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartIsVisible: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleVisibility: (state) => {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export const { toggleVisibility } = uiSlice.actions;

export default uiSlice.reducer;
