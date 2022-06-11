import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-project";

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    // return fetch(url)
    //   .then((resp) => resp.json())
    //   .catch((error) => console.log(error));
    try {
      console.log(thunkAPI.getState());
      const resp = await axios(url);
      // console.log(resp);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("sdfsdf");
    }
  }
);
const initialState = {
  cartItems: cartItems,
  amount: 1,
  total: 1,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart1",
  initialState,
  reducers: {
    clearCart: (state1) => {
      state1.cartItems = [];
      // return { cartItems: [], amount: 10, total: 100, isLoading: false };
    },
    removeItem: (state, action) => {
      // console.log(action);
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

// export reducer cart
export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
  isLoading,
} = cartSlice.actions;

// console.log(cartSlice);

export default cartSlice.reducer;
