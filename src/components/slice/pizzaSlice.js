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
    allPizzasInCart: [], // Массив объектов, представляющих пиццы в корзине (там вся инфа о пиццах. айди размер цена и тд)
    pizzaPricesInCart: {}, // объект в котором содержаться цены каждой пиццы ДОБАВЛЕННОЙ В КОРЗИНУ
    pizzaPrices: {}, // цены пицц на главной странице
    basePrices: {}, // Содержит базовые цены пиццы, бургеров, сэнок и напитков по уникальному айди
    totalOrderPricePizza: 0, // Подсчитываем финальную сумму заказа
  },
  reducers: {
    incrementPizza(state, action) {
      const { pizzaId } = action.payload;
      state.pizzaCount[pizzaId] += 1;
    },
    decrementPizza(state, action) {
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
    incrementPizzaInCart(state, action) {
      const { pizzaId, size } = action.payload;
      const pizzaInCart = state.allPizzasInCart.find(
        (item) => item.pizzaId === pizzaId && item.size === size
      );

      if (pizzaInCart) {
        pizzaInCart.quantity += 1;
      }
    },
    decrementPizzaInCart(state, action) {
      const { pizzaId, size } = action.payload;
      const pizzaInCart = state.allPizzasInCart.find(
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
      const pizzaInCart = state.allPizzasInCart.find(
        (item) => item.pizzaId === pizzaId && item.size === size
      );

      if (pizzaInCart) {
        // если мы нашли такую пиццу уже в корзине то мы можем передать ей новую цену и так же увеличить ее кол-во в корзине( расчеты находяться в PIzzaCARD)
        pizzaInCart.quantity += count;
        pizzaInCart.price = price;
      } else {
        // Если такой пиццы еще нету( размер + айди), то добавляем ёё в наш массив cartItems .( И она отобразится в корзине)
        state.allPizzasInCart.push({
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
    removePizzaFromCart(state, action) {
      const { pizzaId, size } = action.payload;
      state.allPizzasInCart = state.allPizzasInCart.filter(
        (item) => !(item.pizzaId === pizzaId && item.size === size)
      );
      delete state.pizzaPricesInCart[pizzaId];
    },

    updatePizzaCart(state, action) {
      const { pizzaId, size, quantity, price } = action.payload;
      state.pizzaPricesInCart[pizzaId] = price;
      const pizzaInCart = state.allPizzasInCart.find(
        (item) => item.pizzaId === pizzaId && item.size === size
      );

      if (pizzaInCart) {
        pizzaInCart.quantity = quantity;
        pizzaInCart.price = price;
      }
    },
    setPizzaPriceInCart(state, action) {
      const { pizzaId, price } = action.payload;
      state.pizzaPricesInCart[pizzaId] = price;

      const pizzaInCart = state.allPizzasInCart.find(
        (item) => item.pizzaId === pizzaId
      );
      if (pizzaInCart) {
        pizzaInCart.price = price;
      }
    },
    setBasePrice(state, action) {
      const { pizzaId, burgerId, snackId, drinkId, price } = action.payload;
      state.basePrices[pizzaId] = price;
      state.basePrices[burgerId] = price;
      state.basePrices[snackId] = price;
      state.basePrices[drinkId] = price;
    },
    updateTotalOrderPricePizzas(state) {
      state.totalOrderPricePizza = Object.values(state.pizzaPricesInCart)
        .reduce((total, price) => total + parseFloat(price), 0)
        .toFixed(2);
    },
    setPizzaPrice(state, action) {
      const { pizzaId, price } = action.payload;
      state.pizzaPrices[pizzaId] = price;
    },
    setPizzaCountToOne(state, action) {
      const { pizzaId } = action.payload;
      state.pizzaCount[pizzaId] = 1;
    },
  },
});

export const {
  incrementPizza,
  decrementPizza,
  incrementPizzaInCart,
  decrementPizzaInCart,
  addToCartPizza,
  updatePizzaCart,
  removePizzaFromCart,
  setPizzaPriceInCart,
  setBasePrice,
  updateTotalOrderPricePizzas,
  setPizzaPrice,
  setPizzaCountToOne,
} = pizzaSlice.actions;

export default pizzaSlice.reducer;
