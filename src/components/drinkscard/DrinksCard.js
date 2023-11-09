import React from "react";
import { down, up } from "../fontawesome-icons/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartDrink,
  decrementDrink,
  incrementDrink,
  setDrinkPrice,
  updateDrinkCart,
  updateTotalOrderPriceDrinks,
} from "../slice/drinkSlice";
import { setBasePrice } from "../slice/pizzaSlice";

const DrinksCard = (props) => {
  const dispatch = useDispatch();

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

  const allDrinksInCart = useSelector((state) => state.drink.allDrinksInCart);

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
        })
      );
      dispatch(updateTotalOrderPriceDrinks());
      dispatch(setBasePrice({ drinkId: drinkId, price: baseDrinkPrice })); // Что бы нормально использ. инкрем и дикрем в корзине - нужно найти базовую ценну выбранного бургера (ИМЕННО 1шт)
    }
  };
  return (
    <div className="pizza-card">
      <div className="pizza-left-side">
        <div className="pizza-img-bar">
          <div className="pizza-img">
            <img
              style={{ width: "200px", height: "270px" }}
              src={props.thisDrinkImage}
              alt={props.thisDrinkName}
            />
          </div>
        </div>
      </div>
      <div className="pizza-right-side">
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
