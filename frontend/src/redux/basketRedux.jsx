import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
    name: "user",
    initialState: {
        items: []
    },
    reducers: {
        addToBasket: (state, action) => {
            state.items = [...state.items, action.payload]
        },
        removeFromBasket: (state, action) => {
            const index = state.items.findIndex(basketItem => basketItem.slug === action.payload.slug)
            let newBasket = [...state.items]

            if (index >= 0) {
                newBasket.splice(index, 1)
            } else {
                console.warn(`Cannot remove product with slug ${action.payload.slug}`)
            }
            state.items = newBasket;
        },
    }
})

export const { addToBasket, removeFromBasket } = basketSlice.actions;
export const selectItems = (state) => state.basket.items;
export default basketSlice.reducer;