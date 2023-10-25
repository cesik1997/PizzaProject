import { configureStore, combineReducers } from "@reduxjs/toolkit";
import pizzaSlice from "../slice/pizzaSlice";
import cartSlice from "../slice/cartSlice";

const rootReducer = combineReducers({
  pizza: pizzaSlice,
  cart: cartSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
