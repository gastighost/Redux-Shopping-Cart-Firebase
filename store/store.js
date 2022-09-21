import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui/uiSlice";
import cartReducer from "./cart/cartSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
  },
});

export default store;
