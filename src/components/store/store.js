import { configureStore, combineReducers } from "@reduxjs/toolkit";
import pizzaSlice from "../slice/pizzaSlice";
import burgerSlice from "../slice/burgerSlice";
import snackSlice from "../slice/snackSlice";
import drinkSlice from "../slice/drinkSlice";

const rootReducer = combineReducers({
  pizza: pizzaSlice,
  burger: burgerSlice,
  snack: snackSlice,
  drink: drinkSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
