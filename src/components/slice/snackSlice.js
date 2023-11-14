import { createSlice } from "@reduxjs/toolkit";

const initialSnackCounts = {};
for (let i = 1; i <= 6; i++) {
  initialSnackCounts[i] = 1;
}

const snackSlice = createSlice({
  name: "snack",
  initialState: {
    snackCount: initialSnackCounts,
    snackPrices: {}, // цены снэков на главной странице
    snackPricesInCart: {}, // объект в котором содержаться цены каждого снэка ДОБАВЛЕННОГО В КОРЗИНУ
    allSnacksInCart: [], // Сюда будем помещать все снэки добавленные в корзину
    totalOrderPriceSnacks: 0,
    basePrices: {}, // Содержит базовые цены пиццы, бургеров, сэнок и напитков по уникальному айди
  },
  reducers: {
    incrementSnack(state, action) {
      const { snackId } = action.payload;
      state.snackCount[snackId] += 1;
    },
    decrementSnack(state, action) {
      const { snackId } = action.payload;
      state.snackCount[snackId] -= 1;
    },
    incrementSnackInCart(state, action) {
      const { snackId } = action.payload;
      const snackInCart = state.allSnacksInCart.find(
        (item) => item.snackId === snackId
      );
      if (snackInCart) {
        snackInCart.count += 1;
      }
    },
    decrementSnackInCart(state, action) {
      const { snackId } = action.payload;
      const snackInCart = state.allSnacksInCart.find(
        (item) => item.snackId === snackId
      );
      if (snackInCart) {
        snackInCart.count -= 1;
      }
    },
    setSnackPrice(state, action) {
      const { snackId, price } = action.payload;
      state.snackPrices[snackId] = price;
    },
    addToCartSnack(state, action) {
      const { snackId, price, count, name, image, size, baseprice } =
        action.payload;
      state.snackPricesInCart[snackId] = price;

      const snackInCart = state.allSnacksInCart.find(
        (item) => item.snackId === snackId
      );

      if (snackInCart) {
        snackInCart.price = price;
        snackInCart.count = count;
      } else {
        state.allSnacksInCart.push({
          snackId: snackId,
          name: name,
          price: price,
          count: count,
          image: image,
          size: size,
          baseprice: baseprice,
        });
      }
    },
    updateSnackCart(state, action) {
      const { snackId, price, count } = action.payload;
      state.snackPricesInCart[snackId] = price;

      const snackInCart = state.allSnacksInCart.find(
        (item) => item.snackId === snackId
      );
      if (snackInCart) {
        snackInCart.price = price;
        snackInCart.count = count;
      }
    },
    removeSnackFromCart(state, action) {
      const { snackId } = action.payload;
      state.allSnacksInCart = state.allSnacksInCart.filter(
        (item) => !(item.snackId === snackId)
      );
      delete state.snackPricesInCart[snackId];
    },
    updateTotalOrderPriceSnacks(state) {
      state.totalOrderPriceSnacks = Object.values(state.snackPricesInCart)
        .reduce((total, price) => total + parseFloat(price), 0)
        .toFixed(2);
    },
    setSnackPriceInCart(state, action) {
      const { snackId, price } = action.payload;
      state.snackPricesInCart[snackId] = price;

      const snackInCart = state.allSnacksInCart.find(
        (item) => item.snackId === snackId
      );
      if (snackInCart) {
        snackInCart.price = price;
      }
    },
    setBasePriceForSnack(state, action) {
      const { snackId, price } = action.payload;
      state.basePrices[snackId] = price;
    },
  },
});

export const {
  incrementSnack,
  decrementSnack,
  incrementSnackInCart,
  decrementSnackInCart,
  setSnackPrice,
  addToCartSnack,
  updateSnackCart,
  removeSnackFromCart,
  updateTotalOrderPriceSnacks,
  setSnackPriceInCart,
  setBasePriceForSnack,
} = snackSlice.actions;

export default snackSlice.reducer;
