import React from "react";
import { useSelector } from "react-redux";

import logo from "../images/logo-pizzza.svg";
import { cart } from "../icons/fontawesome-icons/icons";
import "./header.css";

const cartlogo = cart;

const Header = (props) => {
  //ОТОБРАЗИТЬ СКОЛЬКО ТОВАРОВ в КОРЗИНЕ
  const cartItems = useSelector((state) => state.pizza.pizzaInCart);
  const cartCounts = useSelector((state) => state.cart.pizzaCounts);

  // Суммируем счетчики для всех видов пицц в корзине
  const totalCartItemCount = cartItems.reduce((total, pizzaId) => {
    return total + cartCounts[pizzaId];
  }, 0);

  return (
    <div className="Header">
      <div className="navbar">
        <div>
          <img className="logo" src={logo} alt="" />
        </div>
        <div className="menubar">
          <div className="item">MAIN PAGE</div>
          <div className="item">MENU</div>
          <div className="item">DELIVERY</div>
          <div className="item">ABOUT US</div>
        </div>
        <div className="cart-img" onClick={props.toggleCartVisible}>
          {cartlogo}
          <div className="cart-count">{totalCartItemCount}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
