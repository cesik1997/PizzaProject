import { createSlice } from "@reduxjs/toolkit";

const initialDrinkCounts = {};
for (let i = 1; i <= 8; i++) {
  initialDrinkCounts[i] = 1;
}

const drinkSlice = createSlice({
  name: "drink",
  initialState: {
    drinkCount: initialDrinkCounts,
    drinkPrices: {}, // цены дринков на главной странице
    drinkPricesInCart: {}, // объект в котором содержаться цены каждого дринка ДОБАВЛЕННОГО В КОРЗИНУ
    allDrinksInCart: [], // Сюда будем помещать все дринки добавленные в корзину
    totalOrderPriceDrinks: 0,
  },
  reducers: {
    incrementDrink(state, action) {
      const { drinkId } = action.payload;
      state.drinkCount[drinkId] += 1;
    },
    decrementDrink(state, action) {
      const { drinkId } = action.payload;
      state.drinkCount[drinkId] -= 1;
    },
    incrementDrinkInCart(state, action) {
      const { drinkId } = action.payload;
      const drinkInCart = state.allDrinksInCart.find(
        (item) => item.drinkId === drinkId
      );
      if (drinkInCart) {
        drinkInCart.count += 1;
      }
    },
    decrementDrinkInCart(state, action) {
      const { drinkId } = action.payload;
      const drinkInCart = state.allDrinksInCart.find(
        (item) => item.drinkId === drinkId
      );
      if (drinkInCart) {
        drinkInCart.count -= 1;
      }
    },
    setDrinkPrice(state, action) {
      const { drinkId, price } = action.payload;
      state.drinkPrices[drinkId] = price;
    },
    addToCartDrink(state, action) {
      const { drinkId, price, count, name, image, size, type } = action.payload;
      state.drinkPricesInCart[drinkId] = price;

      const drinkInCart = state.allDrinksInCart.find(
        (item) => item.drinkId === drinkId
      );

      if (drinkInCart) {
        drinkInCart.price = price;
        drinkInCart.count = count;
      } else {
        state.allDrinksInCart.push({
          drinkId: drinkId,
          name: name,
          price: price,
          count: count,
          image: image,
          size: size,
          type: type
        });
      }
    },
    updateDrinkCart(state, action) {
      const { drinkId, price, count } = action.payload;
      state.drinkPricesInCart[drinkId] = price;

      const drinkInCart = state.allDrinksInCart.find(
        (item) => item.drinkId === drinkId
      );
      if (drinkInCart) {
        drinkInCart.price = price;
        drinkInCart.count = count;
      }
    },
    removeDrinkFromCart(state, action) {
      const { drinkId } = action.payload;
      state.allDrinksInCart = state.allDrinksInCart.filter(
        (item) => !(item.drinkId === drinkId)
      );
      delete state.drinkPricesInCart[drinkId];
    },
    updateTotalOrderPriceDrinks(state) {
      state.totalOrderPriceDrinks = Object.values(state.drinkPricesInCart)
        .reduce((total, price) => total + parseFloat(price), 0)
        .toFixed(2);
    },
    setDrinkPriceInCart(state, action) {
      const { drinkId, price } = action.payload;
      state.drinkPricesInCart[drinkId] = price;

      const drinkInCart = state.allDrinksInCart.find(
        (item) => item.drinkId === drinkId
      );
      if (drinkInCart) {
        drinkInCart.price = price;
      }
    },
  },
});

export const {
  incrementDrink,
  decrementDrink,
  incrementDrinkInCart,
  decrementDrinkInCart,
  setDrinkPrice,
  addToCartDrink,
  updateDrinkCart,
  removeDrinkFromCart,
  updateTotalOrderPriceDrinks,
  setDrinkPriceInCart,
} = drinkSlice.actions;

export default drinkSlice.reducer;
