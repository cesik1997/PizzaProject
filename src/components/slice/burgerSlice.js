import { createSlice } from "@reduxjs/toolkit";

const initialCounts = {};
for (let i = 1; i < 6; i++) {
  initialCounts[i] = 1;
}

const burgerSlice = createSlice({
  name: "burger",
  initialState: {
    burgerCount: initialCounts,
    burgerPrices: {}, // цены бургеров на главной странице
    burgerPricesInCart: {}, // объект в котором содержаться цены каждого бургера ДОБАВЛЕННОГО В КОРЗИНУ
    allBurgersInCart: [], // Сюда будем помещать все бургеры добавленные в корзину
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
    addToCartBurger(state, action) {
      const { burgerId, price, count, name, image } = action.payload;
      state.burgerPricesInCart[burgerId] = price;
      state.allBurgersInCart.push({
        burgerId,
        name,
        price,
        count,
        image,
      });
    },
    updateCart(state, action) {
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
  },
});

export const {
  incrementBurger,
  decrementBurger,
  setBurgerPrice,
  addToCartBurger,
  updateCart,
} = burgerSlice.actions;
export default burgerSlice.reducer;
