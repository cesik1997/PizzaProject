import { createSlice } from "@reduxjs/toolkit";

const initialCounts = {};
for (let i = 1; i <= 10; i++) {
  initialCounts[i] = 1;
}

const pizzaSlice = createSlice({
  name: "pizza",
  // Начальное состояние, включая начальное значение счетчика и цены
  initialState: {
    pizzaCount: initialCounts,
    pizzaPrices: {},
    pizzaAmountInCart: 0,
    pizzaInCart: [],
  },
  reducers: {
    increment(state, action) {
      const { pizzaId } = action.payload;
      state.pizzaCount[pizzaId] += 1;
    },
    decrement(state, action) {
      const { pizzaId } = action.payload;
      if (state.pizzaCount[pizzaId] === undefined) {
        // Если значение не установлено, не делаем ничего
        return;
      } else if (state.pizzaCount[pizzaId] === 1) {
        // Если значение равно 1, не уменьшаем
        return;
      } else {
        state.pizzaCount[pizzaId] -= 1;
      }
    },
    setPizzaPrice(state, action) {
      const { pizzaId, price } = action.payload;
      state.pizzaPrices[pizzaId] = price;
    },
    addToCart(state, action) {
      const { pizzaId } = action.payload;
      state.pizzaInCart.push(pizzaId);
    },
    removeFromCart(state, action) {
      const { pizzaId } = action.payload;
      state.pizzaInCart = state.pizzaInCart.filter((id) => id !== pizzaId);
    },
  },
});

export const {
  increment,
  decrement,
  setPizzaPrice,
  addToCart,
  removeFromCart,
} = pizzaSlice.actions;

export default pizzaSlice.reducer;
