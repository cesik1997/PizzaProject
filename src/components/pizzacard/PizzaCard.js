import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  setPizzaPrice,
  setPizzaCountToOne,
} from "../slice/pizzaSlice";

import {
  updateCart,
  addToCart,
  setBasePrice,
  updateTotalOrderPrice,
} from "../slice/cartSlice";

import { down, up } from "../icons/fontawesome-icons/icons";
import smallpizza from "../images/small-pizza.jpg";

import "./pizzacard.css";

const PizzaCard = (props) => {
  const { id, price, name, image } = props;
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState("40cm");

  //меняем Размеры пиццы
  const handleSizeChange = (newSize) => {
    setSelectedSize(newSize);
    dispatch(setPizzaPrice({ pizzaId: id, price: price[newSize] }));
    dispatch(setPizzaCountToOne({ pizzaId: id })); // ставим счетчик пиццы в 1
    toggleUlVisibility();
  };

  // Тогл корзины
  const [ulVisible, setUlVisible] = useState(false);

  const toggleUlVisibility = () => {
    setUlVisible(!ulVisible);
  };

  // Работа с счетчиком пицц и ценой пиццы

  const pizzaCount = useSelector((state) => state.pizza.pizzaCount[id]); // кол-во пицц в счетчике
  const pizzaPrice = useSelector(
    (state) => state.pizza.pizzaPrices[id] || price[selectedSize]
  );

  const handleIncrement = () => {
    const newCount = pizzaCount + 1;
    dispatch(increment({ pizzaId: id }));
    updatePrice(newCount);
  };

  const handleDecrement = () => {
    const newCount = pizzaCount - 1;
    dispatch(decrement({ pizzaId: id }));
    updatePrice(newCount);
  };

  const updatePrice = (newCount) => {
    if (newCount < 1) {
      return; // Не допускать счетчик меньше 1
    }
    const priceParts = price[selectedSize].split(" ");
    const priceValue = parseFloat(priceParts[0]);
    const newPrice = (newCount * priceValue).toFixed(2) + " €";
    dispatch(setPizzaPrice({ pizzaId: id, price: newPrice }));
  };

  // Работа с добавление пиццы в корзину и проверим есть ли там уже эта пицца
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Проверка массива в котором лежат все пиццы в моей корзине
  const pizzaPricesInCart = useSelector(
    (state) => state.cart.pizzaPricesInCart
  );

  const handleAddToCart = () => {
    const uniquePizzaId = `${id}-${selectedSize}`;
    const pizzaInCart = cartItems.find(
      (item) => item.pizzaId === uniquePizzaId
    );

    const basePizzaPrice = price[selectedSize];

    if (pizzaInCart) {
      const currentPrice = pizzaPricesInCart[uniquePizzaId] || 0;
      const newPrice =
        (parseFloat(currentPrice) + parseFloat(pizzaPrice)).toFixed(2) + " €";
      dispatch(
        updateCart({
          pizzaId: uniquePizzaId,
          size: selectedSize,
          quantity: pizzaInCart.quantity + pizzaCount,
          price: newPrice,
        })
      );
      dispatch(updateTotalOrderPrice());
    } else {
      dispatch(
        addToCart({
          pizzaId: uniquePizzaId,
          price: pizzaPrice,
          size: selectedSize,
          name: name,
          image: image,
          count: pizzaCount,
        })
      );
    }
    dispatch(setBasePrice({ pizzaId: uniquePizzaId, price: basePizzaPrice })); // Установите базовую цену
    dispatch(updateTotalOrderPrice());
  };

  return (
    <div className="pizza-card">
      <div className="pizza-left-side">
        <div className="pizza-img-bar">
          <div className="pizza-img">
            <img
              style={{ width: "300px", height: "300px" }}
              src={props.image}
              alt={props.name}
            />
          </div>
        </div>
      </div>
      <div className="pizza-right-side">
        <div className="pizza-menu">
          <h3>{props.name}</h3>
          <p style={{ letterSpacing: "0.5px" }}>{props.description}</p>
          <div className="pizza-bars">
            <div className="pizza-size-bar">
              <div className="choose-size">Choose size</div>
              <div className="choose-size-bar">
                <div style={{ width: "276px" }}>
                  <div className="bar">
                    <div className="vs-selected-optons">
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontWeight: "600",
                        }}
                      >
                        <img
                          style={{
                            width: "33px",
                            height: "30px",
                            marginRight: "10px",
                          }}
                          src={smallpizza}
                          alt=""
                        />
                        {selectedSize}
                      </span>
                    </div>
                    <div className="vs-actions">
                      <div className="vs-action-btn">
                        <button
                          style={{
                            cursor: "pointer",
                            width: "50px",
                            height: "52px",
                            color: "red",
                            border: "none",
                            backgroundColor: "transparent",
                            fontSize: "17px",
                          }}
                          onClick={toggleUlVisibility}
                        >
                          {down}
                        </button>
                      </div>
                    </div>
                  </div>
                  <ul
                    className={`ul-chose ${
                      ulVisible ? "display-block" : "display-none"
                    }`}
                  >
                    {Object.keys(price).map((size) => (
                      <li
                        key={size}
                        className={`pizza-size${size}`}
                        onClick={() => handleSizeChange(size)}
                      >
                        {size}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pizza-price">
          <div className="price">
            <span style={{ marginRight: "16px" }}>Price:</span>
            {pizzaPrice}
          </div>
          <div className="cart">
            <div className="cart-btn">
              <button className="addtocartbtn" onClick={handleAddToCart}>
                <span
                  style={{
                    fontFamily: "Roboto",
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                  }}
                >
                  ADD TO CART
                </span>
              </button>
              <div className="pizza-count">{pizzaCount}</div>
              <div className="pizza-count-btns">
                <button className="pizzabtnup" onClick={handleIncrement}>
                  {up}
                </button>
                <button className="pizzabtndown" onClick={handleDecrement}>
                  {down}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
