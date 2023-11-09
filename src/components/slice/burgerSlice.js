import { createSlice } from "@reduxjs/toolkit";

const initialBurgersCounts = {};
for (let i = 1; i <= 6; i++) {
  initialBurgersCounts[i] = 1;
}

const burgerSlice = createSlice({
  name: "burger",
  initialState: {
    burgerCount: initialBurgersCounts,
    burgerPrices: {}, // цены бургеров на главной странице
    burgerPricesInCart: {}, // объект в котором содержаться цены каждого бургера ДОБАВЛЕННОГО В КОРЗИНУ
    allBurgersInCart: [], // Сюда будем помещать все бургеры добавленные в корзину
    totalOrderPriceBurgers: 0,
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
    incrementBurgerInCart(state, action) {
      const { burgerId } = action.payload;
      const burgerInCart = state.allBurgersInCart.find(
        (item) => item.burgerId === burgerId
      );
      if (burgerInCart) {
        burgerInCart.count += 1;
      }
    },
    decrementBurgerInCart(state, action) {
      const { burgerId } = action.payload;
      const burgerInCart = state.allBurgersInCart.find(
        (item) => item.burgerId === burgerId
      );
      if (burgerInCart) {
        burgerInCart.count -= 1;
      }
    },
    setBurgerPrice(state, action) {
      const { burgerId, price } = action.payload;
      state.burgerPrices[burgerId] = price;
    },
    addToCartBurger(state, action) {
      const { burgerId, price, count, name, image } = action.payload;
      state.burgerPricesInCart[burgerId] = price;

      const burgerInCart = state.allBurgersInCart.find(
        (item) => item.burgerId === burgerId && item.name === name
      );

      if (burgerInCart) {
        burgerInCart.price = price;
        burgerInCart.count = count;
      } else {
        state.allBurgersInCart.push({
          burgerId: burgerId,
          name: name,
          price: price,
          count: count,
          image: image,
        });
      }
    },
    updateBurgerCart(state, action) {
      const { burgerId, price, count } = action.payload;
      state.burgerPricesInCart[burgerId] = price;

      const burgerInCart = state.allBurgersInCart.find(
        (item) => item.burgerId === burgerId
      );
      if (burgerInCart) {
        burgerInCart.price = price;
        burgerInCart.count = count;
      }
    },
    removeBurgerFromCart(state, action) {
      const { burgerId } = action.payload;
      state.allBurgersInCart = state.allBurgersInCart.filter(
        (item) => !(item.burgerId === burgerId)
      );
      delete state.burgerPricesInCart[burgerId];
    },
    updateTotalOrderPriceBurgers(state) {
      state.totalOrderPriceBurgers = Object.values(state.burgerPricesInCart)
        .reduce((total, price) => total + parseFloat(price), 0)
        .toFixed(2);
    },
    setBurgerPriceInCart(state, action) {
      const { burgerId, price } = action.payload;
      state.burgerPricesInCart[burgerId] = price;

      const burgerInCart = state.allBurgersInCart.find(
        (item) => item.burgerId === burgerId
      );
      if (burgerInCart) {
        burgerInCart.price = price;
      }
    },
  },
});

export const {
  incrementBurger,
  decrementBurger,
  incrementBurgerInCart,
  decrementBurgerInCart,
  setBurgerPrice,
  addToCartBurger,
  updateBurgerCart,
  removeBurgerFromCart,
  updateTotalOrderPriceBurgers,
  setBurgerPriceInCart,
} = burgerSlice.actions;
export default burgerSlice.reducer;
