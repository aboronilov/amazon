import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totatlQuantity: 0,
  total: 0
}

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
    removeItem: (state, action) => {
      const itemSlug = action.payload;
      state.items = state.items.filter((item) => item.slug !== itemSlug);
    },
    increase: (state, {payload}) => {
      const basketItem = state.items.find((item) => item.slug === payload.slug);
      basketItem.quantity += 1;
    },
    decrease: (state, {payload}) => {
      const basketItem = state.items.find((item) => item.slug === payload.slug);
      if (basketItem.quantity === 1) {
        state.items = state.items.filter((item) => item.slug !== basketItem.slug);
      } else {
        basketItem.quantity -= 1;
      }      
    },
    calculateTotals: (state) => {
      let totatlQuantity = 0;
      let total = 0;

      state.items.forEach((item) => {
        totatlQuantity += item.quantity;
        total += item.quantity * parseFloat(item.price);
      })

      state.totatlQuantity = totatlQuantity;
      state.total = total;
    },
    addToBasket: (state, {payload}) => {
      const basketItem = state.items.find((item) => item.slug === payload.slug);
      if (basketItem) {
        basketItem.quantity += payload.quantity
      } else {
        state.items.push(payload)
      }
    }
  }
})

export const { addToBasket, removeItem, increase, decrease, calculateTotals, clearCart } = basketSlice.actions;
export default basketSlice.reducer;

