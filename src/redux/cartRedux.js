import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.product.price * action.payload.item.quantity;
    },
    setInitial: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    getCart: (state, action) => {
      state.products = action.payload.products;
      state.quantity = action.payload.quantity;
      state.total = action.payload.total;
    },
  },
});

export const { addProduct, setInitial, getCart } = cartSlice.actions;
export default cartSlice.reducer;
