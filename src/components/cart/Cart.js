import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  cart,
  arrow,
  xmark,
  down,
  up,
  sackdollar,
} from "../fontawesome-icons/icons";
import "./cart.css";

import {
  decrementPizzaInCart,
  incrementPizzaInCart,
  removePizzaFromCart,
  setPizzaPriceInCart,
  updateTotalOrderPricePizzas,
} from "../slice/pizzaSlice";
import {
  decrementBurgerInCart,
  incrementBurgerInCart,
  removeBurgerFromCart,
  setBurgerPriceInCart,
  updateTotalOrderPriceBurgers,
} from "../slice/burgerSlice";
import {
  decrementSnackInCart,
  incrementSnackInCart,
  removeSnackFromCart,
  setSnackPriceInCart,
  updateTotalOrderPriceSnacks,
} from "../slice/snackSlice";
import {
  decrementDrinkInCart,
  incrementDrinkInCart,
  removeDrinkFromCart,
  setDrinkPriceInCart,
  updateTotalOrderPriceDrinks,
} from "../slice/drinkSlice";

const Cart = (props) => {
  const dispatch = useDispatch();

  /////////////////////////// Добавление пиццы в корзину и все их функции /////////////////////////
  //делаем что бы добавленная пицца появлялась в корзине - МАССИВ который я .map для отображения добавленых пицц в корзину.
  const allPizzasInCart = useSelector((state) => state.pizza.allPizzasInCart); // ОСНОВНОЙ МАССИВ ПИЦЦ В КОРЗИНЕ

  // ПОЛУЧАЕМ ИНФУ ИЗ МАССИВА ГДЕ ХРАНЯТСЯ УЖЕ ВЫБРАННЫЕ  !!ЦЕНЫ!!!  ПИЦЦЫ ( и с главной странице за счет ADD TO CART они поподают в корзину)
  const pizzaPricesInCart = useSelector(
    (state) => state.pizza.pizzaPricesInCart
  );

  // Ищем базовую цену пиццы в корзине
  const basePriceInCart = useSelector((state) => state.pizza.basePrices); //(Она передается из PIZZACARD -> ADD TO CART)

  // Функция для удаления пиццы из корзины
  const handleRemovePizzaFromCart = (pizzaId, size) => {
    dispatch(removePizzaFromCart({ pizzaId, size }));
    dispatch(updateTotalOrderPricePizzas());
  };

  //Пробуем настроить счетчик в корзине что бы норм отображал цену
  const handlePizzaIncrement = (pizzaId, size) => {
    dispatch(incrementPizzaInCart({ pizzaId, count: 1, size }));
    updatePizzaPrice(pizzaId, size, 1);
    dispatch(updateTotalOrderPricePizzas());
  };

  const handlePizzaDecrement = (pizzaId, size) => {
    const pizzaInCart = allPizzasInCart.find(
      (item) => item.pizzaId === pizzaId && item.size === size
    );
    if (pizzaInCart && pizzaInCart.count > 1) {
      dispatch(decrementPizzaInCart({ pizzaId, count: 1, size }));
      updatePizzaPrice(pizzaId, size, -1);
      dispatch(updateTotalOrderPricePizzas());
    }
  };

  const updatePizzaPrice = (pizzaId, size, countChange) => {
    const currentPrice = parseFloat(pizzaPricesInCart[pizzaId] || 0); // Получаем текущую цену по уникальному ключу
    console.log(currentPrice);
    const basePrice = parseFloat(basePriceInCart[pizzaId] || 0); // Получите базовую цену пиццы
    const newPrice = currentPrice + countChange * basePrice;

    dispatch(
      setPizzaPriceInCart({
        pizzaId: pizzaId,
        price: newPrice.toFixed(2) + " €",
      })
    );
  };

  //////////////////////////////// Добавление бургеров в корзину и все их функции  //////////////////////

  const allBurgersInCart = useSelector(
    (state) => state.burger.allBurgersInCart
  );

  const burgerPricesInCart = useSelector(
    (state) => state.burger.burgerPricesInCart
  );

  // ИНКРЕМЕНТ И ДИКРЕМЕНТ БУРГЕРОВ В КОРЗИНЕ
  const handleBurgerIncrement = (burgerId) => {
    dispatch(incrementBurgerInCart({ burgerId, count: 1 }));
    updateBurgerPrice(burgerId, 1);
    dispatch(updateTotalOrderPriceBurgers());
  };

  const handleBurgerDecrement = (burgerId) => {
    const burgerInCart = allBurgersInCart.find(
      (item) => item.burgerId === burgerId
    );
    if (burgerInCart && burgerInCart.count > 1) {
      dispatch(decrementBurgerInCart({ burgerId, count: 1 }));
      updateBurgerPrice(burgerId, -1);
      dispatch(updateTotalOrderPriceBurgers());
    }
  };

  // Обновление цены бургеров в корзине
  const updateBurgerPrice = (burgerId, countChange) => {
    const currentPrice = parseFloat(burgerPricesInCart[burgerId]); // Получаем текущую цену по уникальному ключу
    const basePrice = parseFloat(basePriceInCart[burgerId]); // Получите базовую цену пиццы
    const newPrice = currentPrice + countChange * basePrice;

    dispatch(
      setBurgerPriceInCart({
        burgerId: burgerId,
        price: newPrice.toFixed(2) + " €",
      })
    );
  };

  // Функция для удаление бургеров из корзины
  const handleRemoveBurggerFromCart = (burgerId) => {
    dispatch(removeBurgerFromCart({ burgerId }));
    dispatch(updateTotalOrderPriceBurgers());
  };

  ////////////////  Добавление СНЭКОВ В КОРЗИНУ И Все их функции ///////////////////////

  const allSnacksInCart = useSelector((state) => state.snack.allSnacksInCart);

  const snackPricesInCart = useSelector(
    (state) => state.snack.snackPricesInCart
  );
  // ИНКРЕМЕНТ И ДИКРЕМЕНТ БУРГЕРОВ В КОРЗИНЕ
  const handleSnackIncrement = (snackId) => {
    dispatch(incrementSnackInCart({ snackId, count: 1 }));
    updateSnackPrice(snackId, 1);
    dispatch(updateTotalOrderPriceSnacks());
  };

  const handleSnackDecrement = (snackId) => {
    const snackInCart = allSnacksInCart.find(
      (item) => item.snackId === snackId
    );
    if (snackInCart && snackInCart.count > 1) {
      dispatch(decrementSnackInCart({ snackId, count: 1 }));
      updateSnackPrice(snackId, -1);
      dispatch(updateTotalOrderPriceSnacks());
    }
  };

  // Обновление цены бургеров в корзине
  const updateSnackPrice = (snackId, countChange) => {
    const currentPrice = parseFloat(snackPricesInCart[snackId]); // Получаем текущую цену по уникальному ключу
    const basePrice = parseFloat(basePriceInCart[snackId]); // Получите базовую цену пиццы
    const newPrice = currentPrice + countChange * basePrice;

    dispatch(
      setSnackPriceInCart({
        snackId: snackId,
        price: newPrice.toFixed(2) + " €",
      })
    );
  };

  // Функция для удаление бургеров из корзины
  const handleRemoveSnackFromCart = (snackId) => {
    dispatch(removeSnackFromCart({ snackId }));
    dispatch(updateTotalOrderPriceSnacks());
  };

  //////////////////////////////// Добавляем дринки в корзину и все их функции /////////////////// ////////////

  const allDrinksInCart = useSelector((state) => state.drink.allDrinksInCart);

  const drinkPricesInCart = useSelector(
    (state) => state.drink.drinkPricesInCart
  );
  // ИНКРЕМЕНТ И ДИКРЕМЕНТ БУРГЕРОВ В КОРЗИНЕ
  const handleDrinkIncrement = (drinkId) => {
    dispatch(incrementDrinkInCart({ drinkId, count: 1 }));
    updateDrinkPrice(drinkId, 1);
    dispatch(updateTotalOrderPriceDrinks());
  };

  const handleDrinkDecrement = (drinkId) => {
    const drinkInCart = allDrinksInCart.find(
      (item) => item.drinkId === drinkId
    );
    if (drinkInCart && drinkInCart.count > 1) {
      dispatch(decrementDrinkInCart({ drinkId, count: 1 }));
      updateDrinkPrice(drinkId, -1);
      dispatch(updateTotalOrderPriceDrinks());
    }
  };

  // Обновление цены бургеров в корзине
  const updateDrinkPrice = (drinkId, countChange) => {
    const currentPrice = parseFloat(drinkPricesInCart[drinkId]); // Получаем текущую цену по уникальному ключу
    const basePrice = parseFloat(basePriceInCart[drinkId]); // Получите базовую цену пиццы
    const newPrice = currentPrice + countChange * basePrice;

    dispatch(
      setDrinkPriceInCart({
        drinkId: drinkId,
        price: newPrice.toFixed(2) + " €",
      })
    );
  };

  // Функция для удаление бургеров из корзины
  const handleRemoveDrinkFromCart = (drinkId) => {
    dispatch(removeDrinkFromCart({ drinkId }));
    dispatch(updateTotalOrderPriceDrinks());
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////

  // ПОДСЧИТЫВАЕМ СКОЛЬКО ТОВАРОВ(count) в корзине ВСЕГО
  const getTotalCountInCart = () => {
    let totalCount = 0;
    for (const item of allPizzasInCart) {
      totalCount += item.count;
    }
    for (const item of allDrinksInCart) {
      totalCount += item.count;
    }
    for (const item of allSnacksInCart) {
      totalCount += item.count;
    }
    for (const item of allBurgersInCart) {
      totalCount += item.count;
    }
    return totalCount;
  };


  // Подсчитываем общую сумму заказа и делаем проверку ( если корзина пустая - то отображаем "0 €")
  const totalOrderPricePizza = useSelector(
    (state) => state.pizza.totalOrderPricePizza
  );
  const totalOrderPriceBurgers = useSelector(
    (state) => state.burger.totalOrderPriceBurgers
  );

  const totalOrderPriceSnacks = useSelector(
    (state) => state.snack.totalOrderPriceSnacks
  );
  const totalOrderPriceDrinks = useSelector(
    (state) => state.drink.totalOrderPriceDrinks
  );

  const totalOrderPriceDisplay =
    allPizzasInCart.length > 0 ||
    allBurgersInCart.length > 0 ||
    allSnacksInCart.length > 0 ||
    allDrinksInCart.length > 0
      ? (
          parseFloat(totalOrderPricePizza) +
          parseFloat(totalOrderPriceBurgers) +
          parseFloat(totalOrderPriceSnacks) +
          parseFloat(totalOrderPriceDrinks)
        ).toFixed(2) + " €"
      : "0 €";

  return (
    <div
      className={`cart-container ${
        props.cartVisible ? "display-block" : "display-none"
      }`}
    >
      <div className="header-cart">
        <div className="header-cart-justify">
          <div className="my-cart">
            <div>
              {cart}
              <div className="cart-count-in-cart">{getTotalCountInCart()}</div>
            </div>
            <div className="my-cart-text">My cart</div>
          </div>
          <button className="close-cart-btn" onClick={props.toggleCartVisible}>
            {arrow}
          </button>
        </div>
      </div>
      <div className="menu-cart">
        {allPizzasInCart.map((item) => {
          return (
            <div key={`${item.pizzaId}-${item.size}`} className="pizza-in-cart">
              <div className="chosen-pizza">
                <div className="this-pizza-img">
                  <img
                    style={{
                      maxWidth: "125px",
                      marginRight: "10px",
                    }}
                    src={item.image}
                    alt=""
                  />
                </div>
                <div style={{ paddingTop: "5px" }} className="this-pizza-info">
                  <h3>{item.name}</h3>
                  <p>{item.size}</p>
                  <div className="price">
                    <span>{pizzaPricesInCart[`${item.pizzaId}`]}</span>
                  </div>
                </div>
              </div>
              <div className="pizza-amount">
                <div className="pizza-amount-container">
                  <div className="pizza-count">{item.count}</div>
                  <div className="pizza-count-btns">
                    <button
                      className="pizzabtnup"
                      onClick={() =>
                        handlePizzaIncrement(item.pizzaId, item.size)
                      }
                    >
                      {up}
                    </button>
                    <button
                      className="pizzabtndown"
                      onClick={() =>
                        handlePizzaDecrement(item.pizzaId, item.size)
                      }
                    >
                      {down}
                    </button>
                  </div>
                </div>
                <div
                  className="xmark-container"
                  onClick={() =>
                    handleRemovePizzaFromCart(item.pizzaId, item.size)
                  }
                  style={{
                    fontSize: "20px",
                    height: "25px",
                    width: "25px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {xmark}
                </div>
              </div>
            </div>
          );
        })}
        {allBurgersInCart.map((item) => {
          return (
            <div key={item.burgerId} className="pizza-in-cart">
              <div className="chosen-pizza">
                <div className="this-pizza-img">
                  <img
                    style={{
                      maxWidth: "125px",
                      height: "105px",
                      marginRight: "5px",
                    }}
                    src={item.image}
                    alt=""
                  />
                </div>
                <div style={{ paddingTop: "5px" }} className="this-pizza-info">
                  <h3>{item.name}</h3>
                  <div className="price">
                    <span>{burgerPricesInCart[item.burgerId]}</span>
                  </div>
                </div>
              </div>
              <div className="pizza-amount">
                <div className="pizza-amount-container">
                  <div className="pizza-count">{item.count}</div>
                  <div className="pizza-count-btns">
                    <button
                      className="pizzabtnup"
                      onClick={() => handleBurgerIncrement(item.burgerId)}
                    >
                      {up}
                    </button>
                    <button
                      className="pizzabtndown"
                      onClick={() => handleBurgerDecrement(item.burgerId)}
                    >
                      {down}
                    </button>
                  </div>
                </div>
                <div
                  className="xmark-container"
                  onClick={() => handleRemoveBurggerFromCart(item.burgerId)}
                  style={{
                    fontSize: "20px",
                    height: "25px",
                    width: "25px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {xmark}
                </div>
              </div>
            </div>
          );
        })}
        {allSnacksInCart.map((item) => {
          return (
            <div key={item.snackId} className="pizza-in-cart">
              <div className="chosen-pizza">
                <div className="this-pizza-img">
                  <img
                    style={{
                      maxWidth: "125px",
                      height: "105px",
                      marginRight: "5px",
                    }}
                    src={item.image}
                    alt=""
                  />
                </div>
                <div style={{ paddingTop: "5px" }} className="this-pizza-info">
                  <h3>{item.name}</h3>
                  <p>{item.size}</p>
                  <div className="price">
                    <span>{snackPricesInCart[item.snackId]}</span>
                  </div>
                </div>
              </div>
              <div className="pizza-amount">
                <div className="pizza-amount-container">
                  <div className="pizza-count">{item.count}</div>
                  <div className="pizza-count-btns">
                    <button
                      className="pizzabtnup"
                      onClick={() => handleSnackIncrement(item.snackId)}
                    >
                      {up}
                    </button>
                    <button
                      className="pizzabtndown"
                      onClick={() => handleSnackDecrement(item.snackId)}
                    >
                      {down}
                    </button>
                  </div>
                </div>
                <div
                  className="xmark-container"
                  onClick={() => handleRemoveSnackFromCart(item.snackId)}
                  style={{
                    fontSize: "20px",
                    height: "25px",
                    width: "25px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {xmark}
                </div>
              </div>
            </div>
          );
        })}
        {allDrinksInCart.map((item) => {
          return (
            <div key={item.drinkId} className="pizza-in-cart">
              <div className="chosen-pizza">
                <div className="this-pizza-img">
                  <img
                    style={{
                      maxWidth: "125px",
                      height: "105px",
                      marginRight: "5px",
                    }}
                    src={item.image}
                    alt=""
                  />
                </div>
                <div style={{ paddingTop: "5px" }} className="this-pizza-info">
                  <h3>{item.name}</h3>
                  <p>{item.size}</p>
                  <div className="price">
                    <span>{drinkPricesInCart[item.drinkId]}</span>
                  </div>
                </div>
              </div>
              <div className="pizza-amount">
                <div className="pizza-amount-container">
                  <div className="pizza-count">{item.count}</div>
                  <div className="pizza-count-btns">
                    <button
                      className="pizzabtnup"
                      onClick={() => handleDrinkIncrement(item.drinkId)}
                    >
                      {up}
                    </button>
                    <button
                      className="pizzabtndown"
                      onClick={() => handleDrinkDecrement(item.drinkId)}
                    >
                      {down}
                    </button>
                  </div>
                </div>
                <div
                  className="xmark-container"
                  onClick={() => handleRemoveDrinkFromCart(item.drinkId)}
                  style={{
                    fontSize: "20px",
                    height: "25px",
                    width: "25px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {xmark}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="footer-cart">
        <div className="order-price-container">
          <div className="need-to-pay">Order price</div>
          <div className="price">{totalOrderPriceDisplay}</div>
        </div>
        <button className="order-apply">Place an order {sackdollar}</button>
      </div>
    </div>
  );
};

export default Cart;
