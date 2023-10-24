import React from "react";

import "./cart.css";

import pizzaimg1 from "../images/10pizzas/1pizza.png";
import pizzaimg2 from "../images/10pizzas/2pizza.png";
import pizzaimg3 from "../images/10pizzas/3pizza.png";
import pizzaimg4 from "../images/10pizzas/4pizza.png";
import pizzaimg5 from "../images/10pizzas/5pizza.png";
import pizzaimg6 from "../images/10pizzas/6pizza.png";
import pizzaimg7 from "../images/10pizzas/7pizza.png";
import pizzaimg8 from "../images/10pizzas/8pizza.png";
import pizzaimg9 from "../images/10pizzas/9pizza.png";
import pizzaimg10 from "../images/10pizzas/10pizza.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faArrowRightLong,
  faXmark,
  faAngleDown,
  faAngleUp,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";

import { removeFromCart } from "../slice/pizzaSlice";
import { useDispatch, useSelector } from "react-redux";

const cart = <FontAwesomeIcon icon={faCartShopping} />;
const arrow = <FontAwesomeIcon icon={faArrowRightLong} />;
const xmark = <FontAwesomeIcon icon={faXmark} />;

const down = <FontAwesomeIcon icon={faAngleDown} />;
const up = <FontAwesomeIcon icon={faAngleUp} />;
const sackdollar = <FontAwesomeIcon icon={faSackDollar} />;

const Cart = (props) => {
  const { id, price, cartVisible, toggleCartVisible } = props;

  // как удалить пиццу с корзины
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({ pizzaId: id }));
  };

  //делаем что бы добавленная пицца появлялась в корзине

  const cartItems = useSelector((state) => state.pizza.pizzaInCart); //  массив пицц в корзине

  const cartItemCount = useSelector((state) => state.pizza.pizzaAmountInCart); // общее кол-во пицц в корзине

  const pizzaData = [
    {
      id: 1,
      image: pizzaimg1,
      name: "Supreme",
      size: "40cm",
      price: "16.30 €",
    },
    {
      id: 2,
      image: pizzaimg2,
      name: "Diavola",
      size: "40cm",
      price: "15.20 €",
    },
    {
      id: 3,
      image: pizzaimg3,
      name: "Giovanni",
      size: "40cm",
      price: "15.20 €",
    },
    {
      id: 4,
      image: pizzaimg4,
      name: "Jazzo",
      size: "40cm",
      price: "15.20 €",
    },
    {
      id: 5,
      image: pizzaimg5,
      name: "Polina",
      size: "40cm",
      price: "16.80 €",
    },
    {
      id: 6,
      image: pizzaimg6,
      name: "Caesar",
      size: "40cm",
      price: "17.80 €",
    },
    {
      id: 7,
      image: pizzaimg7,
      name: "Azteca (Hot)",
      size: "40cm",
      price: "16.20 €",
    },
    {
      id: 8,
      image: pizzaimg8,
      name: "Acapulco (Hot)",
      size: "40cm",
      price: "16.20 €",
    },
    {
      id: 9,
      image: pizzaimg9,
      name: "Rucollete",
      size: "40cm",
      price: "17.20 €",
    },
    {
      id: 10,
      image: pizzaimg10,
      name: "Prosciutto",
      size: "40cm",
      price: "17.20 €",
    },
  ];

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
              <div className="cart-count-in-cart">{cartItemCount}</div>
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
                  <div className="pizza-count">1</div>
                  <div className="pizza-count-btns">
                    <button className="pizzabtnup">{up}</button>
                    <button className="pizzabtndown">{down}</button>
                  </div>
                </div>
                <div
                  className="xmark-container"
                  onClick={handleRemoveFromCart}
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
