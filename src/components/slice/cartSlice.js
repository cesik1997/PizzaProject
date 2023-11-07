import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalOrderPrice: 0, // Подсчитываем финальную сумму заказа
    cartItems: [], // Массив объектов, представляющих пиццы в корзине (там вся инфа о пиццах. айди размер цена и тд)
    pizzaPricesInCart: {}, // объект в котором содержаться цены каждой пиццы ДОБАВЛЕННОЙ В КОРЗИНУ
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
    addToCartPizza(state, action) {
      const { pizzaId, price, size, name, image, count } = action.payload;
      state.pizzaPricesInCart[pizzaId] = price;
      const pizzaInCart = state.cartItems.find(
        (item) => item.pizzaId === pizzaId && item.size === size
      );

      if (pizzaInCart) {
        // если мы нашли такую пиццу уже в корзине то мы можем передать ей новую цену и так же увеличить ее кол-во в корзине( расчеты находяться в PIzzaCARD)
        pizzaInCart.quantity += count;
        pizzaInCart.price = price;
      } else {
        // Если такой пиццы еще нету( размер + айди), то добавляем ёё в наш массив cartItems .( И она отобразится в корзине)
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

      const pizzaInCart = state.cartItems.find(
        (item) => item.pizzaId === pizzaId
      );
      if (pizzaInCart) {
        pizzaInCart.price = price;
      }
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
  addToCartPizza,
  updateCart,
  removeFromCart,
  setPizzaPriceInCart,
  setBasePrice,
  updateTotalOrderPrice,
} = cartSlice.actions;

export default cartSlice.reducer;
