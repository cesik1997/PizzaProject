import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { removeFromCart } from "../slice/pizzaSlice";
import {
  decrementCart,
  incrementCart,
  resetPizzaCount,
  setPizzaPriceInCart,
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
  const { id, cartVisible, toggleCartVisible } = props;

  // как удалить пиццу с корзины
  const dispatch = useDispatch();

  const handleRemoveFromCart = (pizzaId) => {
    dispatch(removeFromCart({ pizzaId }));
    dispatch(resetPizzaCount({ pizzaId }));
    dispatch(setPizzaPriceInCart({ pizzaId, price: "0.00 €" }));
  };

  //делаем что бы добавленная пицца появлялась в корзине - МАССИВ который я .map для отображения добавленых пицц в корзину.
  const cartItems = useSelector((state) => state.pizza.pizzaInCart); //  массив пицц в корзине

  // общее кол-во пицц в корзине (ПРОХОДИМСЯ ПО КАЖДОЙ ПИЦЦЫ через [pizzaId])
  const cartCounts = useSelector((state) => state.cart.pizzaCounts);

  //ОТОБРАЗИТЬ СКОЛЬКО ТОВАРОВ в КОРЗИНЕ
  // Суммируем счетчики для всех видов пицц в корзине
  const totalCartItemCount = cartItems.reduce((total, pizzaId) => {
    return total + cartCounts[pizzaId];
  }, 0);

  return (
    <div
      className={`cart-container ${
        cartVisible ? "display-block" : "display-none"
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
          <button className="close-cart-btn" onClick={toggleCartVisible}>
            {arrow}
          </button>
        </div>
      </div>
      <div className="menu-cart">
        {cartItems.map((pizzaId) => {
          const pizza = pizzaData.find((item) => item.id === pizzaId);
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
                    <span>{pizza.price}</span>
                  </div>
                </div>
              </div>
              <div className="pizza-amount">
                <div className="pizza-amount-container">
                  <div className="pizza-count">{cartCounts[pizzaId]}</div>
                  <div className="pizza-count-btns">
                    <button
                      className="pizzabtnup"
                      onClick={() =>
                        dispatch(incrementCart({ pizzaId, count: 1 }))
                      }
                    >
                      {up}
                    </button>
                    <button
                      className="pizzabtndown"
                      onClick={() =>
                        dispatch(decrementCart({ pizzaId, count: -1 }))
                      }
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
          <div className="price">16.30 €</div>
        </div>
        <button className="order-apply">Place an order {sackdollar}</button>
      </div>
    </div>
  );
};

export default Cart;
