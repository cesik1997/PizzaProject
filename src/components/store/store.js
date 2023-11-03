import { configureStore, combineReducers } from "@reduxjs/toolkit";
import pizzaSlice from "../slice/pizzaSlice";
import cartSlice from "../slice/cartSlice";
import burgerSlice from "../slice/burgerSlice";

const rootReducer = combineReducers({
  pizza: pizzaSlice,
  cart: cartSlice,
  burger: burgerSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
