import React from "react";

import { down, up } from "../fontawesome-icons/icons";

import {
  decrementBurger,
  incrementBurger,
  setBurgerPrice,
} from "../slice/burgerSlice";
import { useDispatch, useSelector } from "react-redux";

const BurgerCard = (props) => {
  const dispatch = useDispatch();

  const burgerCount = useSelector(
    (state) => state.burger.burgerCount[props.thisBurgerId]
  );

  const burgerPrice = useSelector(
    (state) =>
      state.burger.burgerPrices[props.thisBurgerId] || props.thisBurgerPrice
  );

  const handleIncrement = () => {
    const newCount = burgerCount + 1;
    dispatch(
      incrementBurger({
        burgerId: props.thisBurgerId,
      })
    );
    updatePrice(newCount);
  };

  const handleDecrement = () => {
    const newCount = burgerCount - 1;
    if (burgerCount > 1) {
      dispatch(
        decrementBurger({
          burgerId: props.thisBurgerId,
        })
      );
      updatePrice(newCount);
    }
  };

  const updatePrice = (newCount) => {
    if (newCount < 1) {
      return;
    }
    const basePrice = props.thisBurgerPrice.split(" ");
    const priceValue = parseFloat(basePrice[0]);
    const newPrice = (newCount * priceValue).toFixed(2) + " €";
    dispatch(setBurgerPrice({ burgerId: props.thisBurgerId, price: newPrice }));
  };

  const handleAddToCart = () => {};

  return (
    <div className="pizza-card">
      <div className="pizza-left-side">
        <div className="pizza-img-bar">
          <div className="pizza-img">
            <img
              style={{ width: "320px", height: "240px" }}
              src={props.thisBurgerImage}
              alt={props.thisBurgerName}
            />
          </div>
        </div>
      </div>
      <div className="pizza-right-side">
        <div className="pizza-menu">
          <h3>{props.thisBurgerName}</h3>
          <p style={{ letterSpacing: "0.5px" }}>
            {props.thisBurgerDescription}
          </p>
        </div>
        <div className="pizza-price">
          <div className="price">
            <span style={{ marginRight: "16px" }}>Price:</span>
            {burgerPrice}
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
              <div className="pizza-count">{burgerCount}</div>
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

export default BurgerCard;
