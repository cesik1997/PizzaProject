import React from "react";
import { useSelector } from "react-redux";

import logo from "../images/icons/logo-pizzza.svg";
import { cart } from "../fontawesome-icons/icons";
import "./header.css";

const cartlogo = cart;



const Header = (props) => {
  //ОТОБРАЗИТЬ СКОЛЬКО ТОВАРОВ в КОРЗИНЕ
  const allPizzasInCart = useSelector((state) => state.pizza.allPizzasInCart);
  const allDrinksInCart = useSelector((state) => state.drink.allDrinksInCart);
  const allSnacksInCart = useSelector((state) => state.snack.allSnacksInCart);
  const allBurgersInCart = useSelector((state) => state.burger.allBurgersInCart);

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
          <div className="cart-count">{getTotalCountInCart()}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
