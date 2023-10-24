import React from "react";

import logo from "../images/logo-pizzza.svg";
import "./header.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
const cartlogo = <FontAwesomeIcon icon={faCartShopping} />;

const Header = (props) => {
  const { toggleCartVisible } = props;

  const cartItemCount = useSelector((state) => state.pizza.pizzaAmountInCart);

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
        <div className="cart-img" onClick={toggleCartVisible}>
          {cartlogo}
          <div className="cart-count">{cartItemCount}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
