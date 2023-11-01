import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  decrementCart,
  incrementCart,
  removeFromCart,
  setPizzaPriceInCart,
  updateTotalOrderPrice,
} from "../slice/cartSlice";

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

  //делаем что бы добавленная пицца появлялась в корзине - МАССИВ который я .map для отображения добавленых пицц в корзину.
  const cartItems = useSelector((state) => state.cart.cartItems); // ОСНОВНОЙ МАССИВ ПИЦЦ В КОРЗИНЕ

  // ПОЛУЧАЕМ ИНФУ ИЗ МАССИВА ГДЕ ХРАНЯТСЯ УЖЕ ВЫБРАННЫЕ  !!ЦЕНЫ!!!  ПИЦЦЫ ( и с главной странице за счет ADD TO CART они поподают в корзину)
  const pizzaPricesInCart = useSelector(
    (state) => state.cart.pizzaPricesInCart
  );

  // Ищем базовую цену пиццы в корзине
  const basePriceInCart = useSelector((state) => state.cart.basePrices); //(Она передается из PIZZACARD -> ADD TO CART)

  // Функция для удаления пиццы из корзины
  const handleRemoveFromCart = (pizzaId, size) => {
    dispatch(removeFromCart({ pizzaId, size }));
    dispatch(updateTotalOrderPrice());
  };

  //Пробуем настроить счетчик в корзине что бы норм отображал цену
  const handleIncrement = (pizzaId, size) => {
    dispatch(incrementCart({ pizzaId, count: 1, size }));
    updatePrice(pizzaId, size, 1);
    dispatch(updateTotalOrderPrice());
  };

  const handleDecrement = (pizzaId, size) => {
    const pizzaInCart = cartItems.find(
      (item) => item.pizzaId === pizzaId && item.size === size
    );
    if (pizzaInCart && pizzaInCart.quantity > 1) {
      dispatch(decrementCart({ pizzaId, count: 1, size }));
      updatePrice(pizzaId, size, -1);
      dispatch(updateTotalOrderPrice());
    }
  };

  const updatePrice = (pizzaId, size, countChange) => {
    const currentPrice = parseFloat(pizzaPricesInCart[pizzaId] || 0); // Получаем текущую цену по уникальному ключу
    const basePrice = parseFloat(basePriceInCart[pizzaId] || 0); // Получите базовую цену пиццы
    const newPrice = currentPrice + countChange * basePrice;

    dispatch(
      setPizzaPriceInCart({
        pizzaId: pizzaId,
        price: newPrice.toFixed(2) + " €",
      })
    );
  };

  // Подсчитываем общую сумму заказа и делаем проверку ( если корзина пустая - то отображаем "0 €")
  const totalOrderPrice = useSelector((state) => state.cart.totalOrderPrice);
  const totalOrderPriceDisplay =
    cartItems.length > 0 ? totalOrderPrice + " €" : "0 €";

  // ПОДСЧИТЫВАЕМ СКОЛЬКО ПИЦЦ(QUANTITY) в корзине ВСЕГО
  const getTotalPizzaCount = () => {
    let totalCount = 0;
    for (const item of cartItems) {
      totalCount += item.quantity;
    }
    return totalCount;
  };

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
              <div className="cart-count-in-cart">{getTotalPizzaCount()}</div>
            </div>
            <div className="my-cart-text">My cart</div>
          </div>
          <button className="close-cart-btn" onClick={props.toggleCartVisible}>
            {arrow}
          </button>
        </div>
      </div>
      <div className="menu-cart">
        {cartItems.map((item) => {
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
                  <div className="pizza-count">{item.quantity}</div>
                  <div className="pizza-count-btns">
                    <button
                      className="pizzabtnup"
                      onClick={() => handleIncrement(item.pizzaId, item.size)}
                    >
                      {up}
                    </button>
                    <button
                      className="pizzabtndown"
                      onClick={() => handleDecrement(item.pizzaId, item.size)}
                    >
                      {down}
                    </button>
                  </div>
                </div>
                <div
                  className="xmark-container"
                  onClick={() => handleRemoveFromCart(item.pizzaId, item.size)}
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
