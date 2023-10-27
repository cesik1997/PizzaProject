import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    pizzaCounts: {}, // Счетчик пицц в моей корзине
    totalOrderPrice: 0, // Подсчитываем финальную сумму заказа
  },
  reducers: {
    incrementCart(state, action) {
      const { pizzaId, count } = action.payload;
      if (state.pizzaCounts[pizzaId] === undefined) {
        state.pizzaCounts[pizzaId] = count;
      } else {
        state.pizzaCounts[pizzaId] += count;
      }
    },
    decrementCart(state, action) {
      const { pizzaId } = action.payload;
      if (state.pizzaCounts[pizzaId] === 1) {
        // Если значение равно 1, не уменьшаем
        return;
      } else {
        state.pizzaCounts[pizzaId] -= 1;
      }
    },
    resetPizzaCount(state, action) {
      const { pizzaId } = action.payload;
      state.pizzaCounts[pizzaId] = 0;
    },
  },
});

export const { incrementCart, decrementCart, resetPizzaCount } =
  cartSlice.actions;

export default cartSlice.reducer;
