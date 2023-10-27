import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  removeFromCart,
  setPizzaPriceInCart,
  updateTotalOrderPrice,
} from "../slice/pizzaSlice";
import {
  decrementCart,
  incrementCart,
  resetPizzaCount,
} from "../slice/cartSlice";

import pizzaData from "../pizzaData/pizzaData";

import {
  cart,
  arrow,
  xmark,
  down,
  up,
  sackdollar,
} from "../icons/fontawesome-icons/icons";
import "./cart.css";

const Cart = (props) => {
  const dispatch = useDispatch();

  // Функция для удаления пиццы из корзины
  const handleRemoveFromCart = (pizzaId) => {
    dispatch(removeFromCart({ pizzaId }));
    dispatch(resetPizzaCount({ pizzaId }));
    updatePrice(pizzaId, -cartCounts[pizzaId]);
    dispatch(updateTotalOrderPrice());
  };

  //делаем что бы добавленная пицца появлялась в корзине - МАССИВ который я .map для отображения добавленых пицц в корзину.
  const cartItems = useSelector((state) => state.pizza.pizzaInCart); //  массив пицц в корзине

  // общее кол-во пицц в корзине (ПРОХОДИМСЯ ПО КАЖДОЙ ПИЦЦЫ через [pizzaId])
  const cartCounts = useSelector((state) => state.cart.pizzaCounts);

  // ПОЛУЧАЕМ ИНФУ ИЗ МАССИВА ГДЕ ХРАНЯТСЯ УЖЕ ВЫБРАННЫЕ  !!ЦЕНЫ!!!  ПИЦЦЫ ( и с главной странице за счет ADD TO CART они поподают в корзину)
  const pizzaPricesInCart = useSelector(
    (state) => state.pizza.pizzaPricesInCart
  );

  //ОТОБРАЗИТЬ СКОЛЬКО ТОВАРОВ в КОРЗИНЕ
  // Суммируем счетчики для всех видов пицц в корзине
  const totalCartItemCount = cartItems.reduce((total, pizzaId) => {
    return total + cartCounts[pizzaId];
  }, 0);

  //Пробуем настроить счетчик в корзине что бы норм отображал цену
  const handleIncrement = (pizzaId) => {
    dispatch(incrementCart({ pizzaId, count: 1 }));
    updatePrice(pizzaId, 1);
    dispatch(updateTotalOrderPrice());
  };

  const handleDecrement = (pizzaId) => {
    if (cartCounts[pizzaId] > 1) {
      dispatch(decrementCart({ pizzaId, count: 1 }));
      updatePrice(pizzaId, -1);
      dispatch(updateTotalOrderPrice());
    }
  };

  const updatePrice = (pizzaId, countChange) => {
    const pizza = pizzaData.find((item) => item.id === pizzaId);
    if (pizza) {
      const basePrice = parseFloat(pizza.price);

      const currentPrice = parseFloat(pizzaPricesInCart[pizzaId]);
      const newPrice = currentPrice + countChange * basePrice;

      dispatch(
        setPizzaPriceInCart({ pizzaId, price: newPrice.toFixed(2) + " €" })
      );
    }
  };

  // Подсчитываем общую сумму заказа и делаем проверку ( если корзина пустая - то отображаем "0 €")
  const totalOrderPrice = useSelector((state) => state.pizza.totalOrderPrice);
  const totalOrderPriceDisplay =
    cartItems.length > 0 ? totalOrderPrice + " €" : "0 €";

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
              <div className="cart-count-in-cart">{totalCartItemCount}</div>
            </div>
            <div className="my-cart-text">My cart</div>
          </div>
          <button className="close-cart-btn" onClick={props.toggleCartVisible}>
            {arrow}
          </button>
        </div>
      </div>
      <div className="menu-cart">
        {cartItems.map((pizzaId) => {
          const pizza = pizzaData.find((item) => item.id === pizzaId);
          const priceInCart = pizzaPricesInCart[pizzaId]; // Получите цену из нового поля
          if (!pizza) {
            return null; // Пицца не найдена
          }

          return (
            <div key={pizza.id} className="pizza-in-cart">
              <div className="chosen-pizza">
                <div className="this-pizza-img">
                  <img
                    style={{
                      maxWidth: "125px",
                      marginRight: "10px",
                    }}
                    src={pizza.image}
                    alt=""
                  />
                </div>
                <div style={{ paddingTop: "5px" }} className="this-pizza-info">
                  <h3>{pizza.name}</h3>
                  <p>{pizza.size}</p>
                  <div className="price">
                    <span>{priceInCart}</span>
                  </div>
                </div>
              </div>
              <div className="pizza-amount">
                <div className="pizza-amount-container">
                  <div className="pizza-count">{cartCounts[pizzaId]}</div>
                  <div className="pizza-count-btns">
                    <button
                      className="pizzabtnup"
                      onClick={() => handleIncrement(pizzaId)}
                    >
                      {up}
                    </button>
                    <button
                      className="pizzabtndown"
                      onClick={() => handleDecrement(pizzaId)}
                    >
                      {down}
                    </button>
                  </div>
                </div>
                <div
                  className="xmark-container"
                  onClick={() => handleRemoveFromCart(pizzaId)}
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
