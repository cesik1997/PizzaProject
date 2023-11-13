import {
  addToCartBurger,
  updateTotalOrderPriceBurgers,
} from "../slice/burgerSlice";
import {
  addToCartDrink,
  updateTotalOrderPriceDrinks,
} from "../slice/drinkSlice";
import {
  addToCartPizza,
  updateTotalOrderPricePizzas,
} from "../slice/pizzaSlice";
import {
  addToCartSnack,
  updateTotalOrderPriceSnacks,
} from "../slice/snackSlice";

export const loadCartData = (dispatch) => {
  const drinksInCart = JSON.parse(localStorage.getItem("drinksInCart")) || [];
  const burgersInCart = JSON.parse(localStorage.getItem("burgersInCart")) || [];
  const pizzasInCart = JSON.parse(localStorage.getItem("pizzasInCart")) || [];
  const snackInCart = JSON.parse(localStorage.getItem("snacksInCart")) || [];

  if (drinksInCart.length > 0) {
    drinksInCart.forEach((item) => {
      dispatch(
        addToCartDrink({
          drinkId: item.drinkId,
          name: item.name,
          price: item.price,
          count: item.count,
          image: item.image,
          size: item.size,
        })
      );
      dispatch(updateTotalOrderPriceDrinks());
    });
  }
  if (burgersInCart.length > 0) {
    burgersInCart.forEach((item) => {
      dispatch(
        addToCartBurger({
          burgerId: item.burgerId,
          name: item.name,
          price: item.price,
          count: item.count,
          image: item.image,
        })
      );
      dispatch(updateTotalOrderPriceBurgers());
    });
  }
  if (pizzasInCart.length > 0) {
    pizzasInCart.forEach((item) => {
      dispatch(
        addToCartPizza({
          pizzaId: item.pizzaId,
          price: item.price,
          size: item.size,
          name: item.name,
          image: item.image,
          count: item.count,
        })
      );
      dispatch(updateTotalOrderPricePizzas());
    });
  }
  if (snackInCart.length > 0) {
    snackInCart.forEach((item) => {
      dispatch(
        addToCartSnack({
          snackId: item.snackId,
          name: item.name,
          price: item.price,
          count: item.count,
          image: item.image,
          size: item.size,
        })
      );
      dispatch(updateTotalOrderPriceSnacks());
    });
  }
};
