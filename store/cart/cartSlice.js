import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const { id, name, price } = action.payload;
      const index = state.items.findIndex((item) => item.itemId === id);

      if (index < 0) {
        state.items.push({
          name: name,
          itemId: id,
          itemPrice: price,
          quantity: 1,
          totalPrice: price,
        });
      } else {
        state.items[index].quantity += 1;
        state.items[index].totalPrice += price;
      }
      state.totalQuantity += 1;
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const index = state.items.findIndex((item) => item.itemId === id);

      if (index >= 0) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
          state.items[index].totalPrice -= state.items[index].itemPrice;
        } else {
          state.items = state.items.filter((item) => item.itemId !== id);
        }
      }
      if (state.totalQuantity > 0) {
        state.totalQuantity -= 1;
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
