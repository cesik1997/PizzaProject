import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  incrementPizza,
  decrementPizza,
  setPizzaPrice,
  setPizzaCountToOne,
  updatePizzaCart,
  addToCartPizza,
  setBasePrice,
  updateTotalOrderPricePizzas,
} from "../slice/pizzaSlice";

import { down, up } from "../fontawesome-icons/icons";
import smallpizza from "../images/icons/small-pizza.jpg";

import "./pizzacard.css";
import { loadCartData } from "../cartdata/loadCartData"; // Тут храняться данные из localstorage

const PizzaCard = (props) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("40cm");

  ///////////////////////////////  РАБОТАЕМ С СОХРАНЕНИЕМ ДАННЫХ В КОРЗИНУ ЧЕРЕЗ localstorage  ///////////////////////

  useEffect(() => {
    loadCartData(dispatch);
  }, []);

  // ОСНОВНОЙ массив куда записываюися ВСЕ добавленные пиццы в мою корзину (каждая пицца в отдельный объект)
  const allPizzasInCart = useSelector((state) => state.pizza.allPizzasInCart);

  //  функция для сохранения данных КОРЗИНЫ в localstorage
  useEffect(() => {
    saveCartToLocalStorage(allPizzasInCart);
  }, [allPizzasInCart]);

  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem("pizzasInCart", JSON.stringify(cartData));
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //меняем Размеры пиццы
  const handleSizeChange = (newSize) => {
    setSelectedSize(newSize);
    dispatch(
      setPizzaPrice({
        pizzaId: props.thisPizzaId,
        price: props.thisPizzaPrice[newSize],
      })
    );
    dispatch(setPizzaCountToOne({ pizzaId: props.thisPizzaId })); // ставим счетчик пиццы в 1 если выбираем другой размер пиццы
    toggleUlVisibility();
  };

  // Тогл корзины
  const [ulVisible, setUlVisible] = useState(false);

  const toggleUlVisibility = () => {
    setUlVisible(!ulVisible);
  };

  // Работа с счетчиком пицц и ценой пиццы

  const pizzaCount = useSelector(
    (state) => state.pizza.pizzaCount[props.thisPizzaId]
  ); // кол-во пицц в счетчике
  const pizzaPrice = useSelector(
    (state) =>
      state.pizza.pizzaPrices[props.thisPizzaId] ||
      props.thisPizzaPrice[selectedSize]
  );

  const handleIncrement = () => {
    const newCount = pizzaCount + 1;
    dispatch(incrementPizza({ pizzaId: props.thisPizzaId }));
    updatePrice(newCount);
  };

  const handleDecrement = () => {
    const newCount = pizzaCount - 1;
    dispatch(decrementPizza({ pizzaId: props.thisPizzaId }));
    updatePrice(newCount);
  };

  const updatePrice = (newCount) => {
    if (newCount < 1) {
      return; // Не допускать счетчик меньше 1
    }
    const priceParts = props.thisPizzaPrice[selectedSize].split(" ");
    const priceValue = parseFloat(priceParts[0]);
    const newPrice = (newCount * priceValue).toFixed(2) + " €";
    dispatch(setPizzaPrice({ pizzaId: props.thisPizzaId, price: newPrice }));
  };

  // Массив где записаны все цены выбранной пиццы в формате [ 1-40cm : '40,50 €']
  const pizzaPricesInCart = useSelector(
    (state) => state.pizza.pizzaPricesInCart
  );

  // Добавление пиццы в корзину при нажатии ADD TO CART
  const handleAddToCartPizza = () => {
    const uniquePizzaId = `${props.thisPizzaId}-${selectedSize}`;
    const pizzaInCart = allPizzasInCart.find(
      (item) => item.pizzaId === uniquePizzaId
    );

    const basePizzaPrice = props.thisPizzaPrice[selectedSize];

    if (pizzaInCart) {
      const currentPrice = pizzaPricesInCart[uniquePizzaId] || 0;
      const newPrice =
        (parseFloat(currentPrice) + parseFloat(pizzaPrice)).toFixed(2) + " €";
      dispatch(
        updatePizzaCart({
          pizzaId: uniquePizzaId,
          size: selectedSize,
          count: pizzaInCart.count + pizzaCount,
          price: newPrice,
        })
      );
      dispatch(updateTotalOrderPricePizzas());
    } else {
      dispatch(
        addToCartPizza({
          pizzaId: uniquePizzaId,
          price: pizzaPrice,
          size: selectedSize,
          name: props.thisPizzaName,
          image: props.thisPizzaImage,
          count: pizzaCount,
        })
      );
    }
    dispatch(setBasePrice({ pizzaId: uniquePizzaId, price: basePizzaPrice })); // Что бы нормально использ. инкрем и дикрем в корзине - нужно найти базовую ценну выбранной пиццы (ИМЕННО 1шт)
    dispatch(updateTotalOrderPricePizzas());
  };

  return (
    <div className="pizza-card">
      <div className="pizza-left-side">
        <div className="pizza-img-bar">
          <div className="pizza-img">
            <img
              className="main-pizza-img"
              src={props.thisPizzaImage}
              alt={props.thisPizzaName}
            />
          </div>
        </div>
      </div>
      <div className="pizza-right-side">
        <div className="pizza-menu">
          <h3>{props.thisPizzaName}</h3>
          <p style={{ letterSpacing: "0.5px" }}>{props.thisPizzaDescription}</p>
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
                    {Object.keys(props.thisPizzaPrice).map((size) => (
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
              <button className="addtocartbtn" onClick={handleAddToCartPizza}>
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
