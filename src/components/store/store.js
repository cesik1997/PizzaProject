import { configureStore, combineReducers } from "@reduxjs/toolkit";
import pizzaSlice from "../slice/pizzaSlice";

const rootReducer = combineReducers({
  pizza: pizzaSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
