import { createSlice } from "@reduxjs/toolkit";

const initialCounts = {};
for (let i = 1; i < 6; i++) {
  initialCounts[i] = 1;
}

const burgerSlice = createSlice({
  name: "burger",
  initialState: {
    burgerCount: initialCounts,
    burgerPrices: {},
  },
  reducers: {
    incrementBurger(state, action) {
      const { burgerId } = action.payload;
      state.burgerCount[burgerId] += 1;
    },
    decrementBurger(state, action) {
      const { burgerId } = action.payload;
      state.burgerCount[burgerId] -= 1;
    },
    setBurgerPrice(state, action) {
      const { burgerId, price } = action.payload;
      state.burgerPrices[burgerId] = price;
    },
  },
});

export const { incrementBurger, decrementBurger, setBurgerPrice } =
  burgerSlice.actions;
export default burgerSlice.reducer;
