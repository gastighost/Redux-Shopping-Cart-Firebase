import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showNotification } from "../ui/uiSlice";

import axios from "axios";

const initialState = {
  items: [],
  totalQuantity: 0,
  fetched: false,
};

export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(
      showNotification({
        status: "pending",
        title: "Fetching cart...",
        message: "Fetching cart data!",
      })
    );

    try {
      const response = await axios.get(
        "https://redux-cart-project-273a8-default-rtdb.firebaseio.com/cart.json"
      );
      thunkAPI.dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Retrieved cart data successfully!",
        })
      );

      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  }
);

export const sendCartData = createAsyncThunk(
  "cart/sendCartData",
  async (cart, thunkAPI) => {
    const { items, totalQuantity } = cart;

    thunkAPI.dispatch(
      showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );
    try {
      const response = await axios.put(
        "https://redux-cart-project-273a8-default-rtdb.firebaseio.com/cart.json",
        { items, totalQuantity }
      );
      thunkAPI.dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );

      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  }
);

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
      state.fetched = true;
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
      state.fetched = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.fulfilled, (state, action) => {
        const { items, totalQuantity } = action.payload;
        return {
          items: items || [],
          totalQuantity: totalQuantity || 0,
          fetched: false,
        };
      })
      .addCase(sendCartData.fulfilled, (state, action) => {
        const { items, totalQuantity } = action.payload;
        console.log(state.fetched);
        state = { items, totalQuantity };
      });
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
