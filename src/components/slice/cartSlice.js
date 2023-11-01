import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalOrderPrice: 0, // Подсчитываем финальную сумму заказа
    cartItems: [], // Массив объектов, представляющих пиццы в корзине
    pizzaPricesInCart: {},
    basePrices: {}, // Содержит базовые цены пиццы по уникальному айди
  },
  reducers: {
    incrementCart(state, action) {
      const { pizzaId, size } = action.payload;
      const pizzaInCart = state.cartItems.find(
        (item) => item.pizzaId === pizzaId && item.size === size
      );

      if (pizzaInCart) {
        pizzaInCart.quantity += 1;
      }
    },
    decrementCart(state, action) {
      const { pizzaId, size } = action.payload;
      const pizzaInCart = state.cartItems.find(
        (item) => item.pizzaId === pizzaId && item.size === size
      );

      if (pizzaInCart) {
        if (pizzaInCart.quantity === 1) {
          // Если количество равно 1, ничего не делаем
          return;
        } else {
          pizzaInCart.quantity -= 1;
        }
      }
    },
    addToCart(state, action) {
      const { pizzaId, price, size, name, image, count } = action.payload;
      state.pizzaPricesInCart[pizzaId] = price;
      const pizzaInCart = state.cartItems.find(
        (item) => item.pizzaId === pizzaId && item.size === size
      );

      if (pizzaInCart) {
        pizzaInCart.quantity += count;
        pizzaInCart.price = price;
      } else {
        // В противном случае, добавьте новую пиццу в корзину
        state.cartItems.push({
          pizzaId,
          price,
          size,
          quantity: count,
          name,
          image,
          count,
        });
      }
    },
    updateCart(state, action) {
      const { pizzaId, size, quantity, price } = action.payload;
      state.pizzaPricesInCart[pizzaId] = price;
      const pizzaInCart = state.cartItems.find(
        (item) => item.pizzaId === pizzaId && item.size === size
      );

      if (pizzaInCart) {
        pizzaInCart.quantity = quantity;
        pizzaInCart.price = price;
      }
    },
    removeFromCart(state, action) {
      const { pizzaId, size } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => !(item.pizzaId === pizzaId && item.size === size)
      );
      delete state.pizzaPricesInCart[pizzaId];
    },
    setPizzaPriceInCart(state, action) {
      const { pizzaId, price } = action.payload;
      state.pizzaPricesInCart[pizzaId] = price;
    },
    setBasePrice(state, action) {
      const { pizzaId, price } = action.payload;
      state.basePrices[pizzaId] = price;
    },
    updateTotalOrderPrice(state) {
      state.totalOrderPrice = Object.values(state.pizzaPricesInCart)
        .reduce((total, price) => total + parseFloat(price), 0)
        .toFixed(2);
    },
  },
});

export const {
  incrementCart,
  decrementCart,
  addToCart,
  updateCart,
  removeFromCart,
  setPizzaPriceInCart,
  setBasePrice,
  updateTotalOrderPrice,
} = cartSlice.actions;

export default cartSlice.reducer;
