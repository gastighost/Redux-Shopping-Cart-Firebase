import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartIsVisible: false,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleVisibility: (state) => {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification: (state, action) => {
      const { status, title, message } = action.payload;
      state.notification = { status, title, message };
    },
  },
});

export const { toggleVisibility, showNotification } = uiSlice.actions;

export default uiSlice.reducer;
