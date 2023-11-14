import React, { useEffect } from "react";
import { down, up } from "../fontawesome-icons/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartDrink,
  decrementDrink,
  incrementDrink,
  setBasePriceForDrink,
  setDrinkPrice,
  updateDrinkCart,
  updateTotalOrderPriceDrinks,
} from "../slice/drinkSlice";

import { loadCartData } from "../cartdata/loadCartData"; // Тут храняться данные из localstorage

const DrinksCard = (props) => {
  const dispatch = useDispatch();

  ///////////////////////////////  РАБОТАЕМ С СОХРАНЕНИЕМ ДАННЫХ В КОРЗИНУ ЧЕРЕЗ localstorage  ///////////////////////
  useEffect(() => {
    loadCartData(dispatch);
  }, []);

  // ОСНОВНОЙ массив куда записываюися ВСЕ добавленные дринки в мою корзину (каждый дринк в отдельный объект)
  const allDrinksInCart = useSelector((state) => state.drink.allDrinksInCart);

  // // функция для сохранения данных КОРЗИНЫ в localstorage
  useEffect(() => {
    saveCartToLocalStorage(allDrinksInCart);
  }, [allDrinksInCart]);

  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem("drinksInCart", JSON.stringify(cartData));
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const drinkCount = useSelector(
    (state) => state.drink.drinkCount[props.thisDrinkId]
  );

  const drinkPrice = useSelector(
    (state) =>
      state.drink.drinkPrices[props.thisDrinkId] || props.thisDrinkPrice
  );

  const drinkPricesInCart = useSelector(
    (state) => state.drink.drinkPricesInCart
  );

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleIncrement = () => {
    const newCount = drinkCount + 1;
    dispatch(
      incrementDrink({
        drinkId: props.thisDrinkId,
      })
    );
    updatePrice(newCount);
  };

  const handleDecrement = () => {
    const newCount = drinkCount - 1;
    if (drinkCount > 1) {
      dispatch(
        decrementDrink({
          drinkId: props.thisDrinkId,
        })
      );
      updatePrice(newCount);
    }
  };

  const updatePrice = (newCount) => {
    if (newCount < 1) {
      return;
    }
    const basePrice = props.thisDrinkPrice.split(" ");
    const priceValue = parseFloat(basePrice[0]);
    const newPrice = (newCount * priceValue).toFixed(2) + " €";
    dispatch(setDrinkPrice({ drinkId: props.thisDrinkId, price: newPrice }));
  };

  const handleAddToCartDrink = () => {
    const drinkId = props.thisDrinkId;

    const baseDrinkPrice = props.thisDrinkPrice;

    // Сделаем проверку если такие бургеры уже есть в корзине
    const drinkInCart = allDrinksInCart.find(
      (item) => item.drinkId === drinkId
    );
    if (drinkInCart) {
      const currentPrice = drinkPricesInCart[drinkId];
      const newPrice =
        (parseFloat(currentPrice) + parseFloat(drinkPrice)).toFixed(2) + " €";
      dispatch(
        updateDrinkCart({
          drinkId: drinkId,
          count: drinkInCart.count + drinkCount,
          price: newPrice,
        })
      );
      dispatch(updateTotalOrderPriceDrinks());
    } else {
      dispatch(
        addToCartDrink({
          drinkId: drinkId,
          name: props.thisDrinkName,
          price: drinkPrice,
          count: drinkCount,
          image: props.thisDrinkImage,
          size: props.thisDrinkSize,
          type: props.thisDrinkType,
          baseprice: props.thisDrinkPrice,
        })
      );
      dispatch(updateTotalOrderPriceDrinks());
      dispatch(
        setBasePriceForDrink({ drinkId: drinkId, price: baseDrinkPrice })
      ); // Что бы нормально использ. инкрем и дикрем в корзине - нужно найти базовую ценну выбранного дринка (ИМЕННО 1шт)
    }
  };
  return (
    <div className="pizza-card">
      <div
        className="pizza-left-side"
        style={{ paddingTop: "30px", paddingLeft: "15px" }}
      >
        <div className="pizza-img-bar">
          <div className="pizza-img" style={{ paddingRight: "20px" }}>
            <img
              style={{ width: "170px", height: "240px" }}
              src={props.thisDrinkImage}
              alt={props.thisDrinkName}
            />
          </div>
        </div>
      </div>
      <div
        className="pizza-right-side"
        style={{ maxHeight: "370px", minWidth: "500px", paddingTop: "10px" }}
      >
        <div className="pizza-menu">
          <h3>{props.thisDrinkName}</h3>
          <div>
            <p>{props.thisDrinkSize}</p>
          </div>
          <p style={{ letterSpacing: "0.5px" }}>{props.thisDrinkDescription}</p>
        </div>

        <div className="pizza-price">
          <div className="price">
            <span style={{ marginRight: "16px" }}>Price:</span>
            {drinkPrice}
          </div>
          <div className="cart">
            <div className="cart-btn">
              <button className="addtocartbtn" onClick={handleAddToCartDrink}>
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
              <div className="pizza-count">{drinkCount}</div>
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

export default DrinksCard;
