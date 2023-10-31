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
    pizzaPrices: {}, // цены пицц на главной страницы
    pizzaPricesInCart: {},
    pizzaAmountInCart: 0,
    pizzaInCart: [],
    selectedPizzaSize: {},
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
      const { pizzaId, price, size } = action.payload;
      state.pizzaInCart.push(pizzaId);
      state.pizzaPricesInCart[pizzaId] = price;
      state.selectedPizzaSize[pizzaId] = size;
    },
    removeFromCart(state, action) {
      const { pizzaId } = action.payload;
      state.pizzaInCart = state.pizzaInCart.filter((id) => id !== pizzaId);
    },
    setPizzaPriceInCart(state, action) {
      const { pizzaId, price } = action.payload;
      state.pizzaPricesInCart[pizzaId] = price;
    },
    updateTotalOrderPrice(state) {
      state.totalOrderPrice = Object.values(state.pizzaPricesInCart)
        .reduce((total, price) => total + parseFloat(price), 0)
        .toFixed(2);
    },
    setPizzaCountToOne(state, action) {
      const { pizzaId } = action.payload;
      state.pizzaCount[pizzaId] = 1;
    },
  },
});

export const {
  increment,
  decrement,
  setPizzaPrice,
  addToCart,
  removeFromCart,
  setPizzaPriceInCart,
  updateTotalOrderPrice,
  setPizzaCountToOne,
  setSelectedPizzaSize,
} = pizzaSlice.actions;

export default pizzaSlice.reducer;
