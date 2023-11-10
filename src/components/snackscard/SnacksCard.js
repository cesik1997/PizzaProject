import React, { useEffect } from "react";
import { down, up } from "../fontawesome-icons/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartSnack,
  decrementSnack,
  incrementSnack,
  setSnackPrice,
  updateSnackCart,
  updateTotalOrderPriceSnacks,
} from "../slice/snackSlice";
import { setBasePrice } from "../slice/pizzaSlice";

const SnacksCard = (props) => {
  const dispatch = useDispatch();

  ///////////////////////////////  РАБОТАЕМ С СОХРАНЕНИЕМ ДАННЫХ В КОРЗИНУ ЧЕРЕЗ localstorage  ///////////////////////

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("snackInCart")) || [];
    // dispatch action to update the cart with loaded data

    if (cartData.length > 0) {
      cartData.forEach((item) => {
        dispatch(
          addToCartSnack({
            snackId: item.snackId,
            name: item.name,
            price: item.price,
            count: item.count,
            image: item.image,
            size: item.size,
          })
        );
        dispatch(updateTotalOrderPriceSnacks());
      });
    }
  }, []);

  const allSnacksInCart = useSelector((state) => state.snack.allSnacksInCart);
  // функция для сохранения данных КОРЗИНЫ в localstorage
  useEffect(() => {
    saveCartToLocalStorage(allSnacksInCart);
  }, [allSnacksInCart]);

  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem("snackInCart", JSON.stringify(cartData));
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const snackCount = useSelector(
    (state) => state.snack.snackCount[props.thisSnackId]
  );

  const snackPrice = useSelector(
    (state) =>
      state.snack.snackPrices[props.thisSnackId] || props.thisSnackPrice
  );

  const snackPricesInCart = useSelector(
    (state) => state.snack.snackPricesInCart
  );

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleIncrement = () => {
    const newCount = snackCount + 1;
    dispatch(
      incrementSnack({
        snackId: props.thisSnackId,
      })
    );
    updatePrice(newCount);
  };

  const handleDecrement = () => {
    const newCount = snackCount - 1;
    if (snackCount > 1) {
      dispatch(
        decrementSnack({
          snackId: props.thisSnackId,
        })
      );
      updatePrice(newCount);
    }
  };

  const updatePrice = (newCount) => {
    if (newCount < 1) {
      return;
    }
    const basePrice = props.thisSnackPrice.split(" ");
    const priceValue = parseFloat(basePrice[0]);
    const newPrice = (newCount * priceValue).toFixed(2) + " €";
    dispatch(setSnackPrice({ snackId: props.thisSnackId, price: newPrice }));
  };

  const handleAddToCartSnack = () => {
    const snackId = props.thisSnackId;

    const baseSnackPrice = props.thisSnackPrice;

    // Сделаем проверку если такие бургеры уже есть в корзине
    const snacksInCart = allSnacksInCart.find(
      (item) => item.snackId === snackId
    );
    if (snacksInCart) {
      const currentPrice = snackPricesInCart[snackId];
      const newPrice =
        (parseFloat(currentPrice) + parseFloat(snackPrice)).toFixed(2) + " €";
      dispatch(
        updateSnackCart({
          snackId: snackId,
          count: snacksInCart.count + snackCount,
          price: newPrice,
        })
      );
      dispatch(updateTotalOrderPriceSnacks());
    } else {
      dispatch(
        addToCartSnack({
          snackId: snackId,
          name: props.thisSnackName,
          price: snackPrice,
          count: snackCount,
          image: props.thisSnackImage,
          size: props.thisSnackSize,
        })
      );
      dispatch(updateTotalOrderPriceSnacks());
      dispatch(setBasePrice({ snackId: snackId, price: baseSnackPrice })); // Что бы нормально использ. инкрем и дикрем в корзине - нужно найти базовую ценну выбранного бургера (ИМЕННО 1шт)
    }
  };

  return (
    <div className="pizza-card">
      <div className="pizza-left-side">
        <div className="pizza-img-bar" style={{paddingRight: "0px"}}>
          <div className="pizza-img">
            <img
              style={{ width: "300px", height: "210px" }}
              src={props.thisSnackImage}
              alt={props.thisSnackName}
            />
          </div>
        </div>
      </div>
      <div className="pizza-right-side">
        <div className="pizza-menu">
          <h3>{props.thisSnackName}</h3>
          <div>
            <p>{props.thisSnackSize}</p>
          </div>
          <p style={{ letterSpacing: "0.5px" }}>{props.thisSnackDescription}</p>
        </div>
        <div className="pizza-price">
          <div className="price">
            <span style={{ marginRight: "16px" }}>Price:</span>
            {snackPrice}
          </div>
          <div className="cart">
            <div className="cart-btn">
              <button className="addtocartbtn" onClick={handleAddToCartSnack}>
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
              <div className="pizza-count">{snackCount}</div>
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

export default SnacksCard;
