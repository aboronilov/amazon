import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
    totatlQuantity: 0,
  },
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
      state.totatlQuantity += action.payload.quantity;
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.slug === action.payload.slug
      );
      let newBasket = [...state.items];
      let newQuantity = 0;

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Cannot remove product with slug ${action.payload.slug}`);
      }
      state.items = newBasket;

      newBasket.map((item, _) => newQuantity += item.quantity);
      state.totatlQuantity = newQuantity;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
export default basketSlice.reducer;
