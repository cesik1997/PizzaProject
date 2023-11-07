import React, { useEffect } from "react";

import { down, up } from "../fontawesome-icons/icons";

import {
  decrementBurger,
  incrementBurger,
  setBurgerPrice,
  updateCart,
  addToCartBurger,
} from "../slice/burgerSlice";

import { addToCartPizza } from "../slice/cartSlice";

import { useDispatch, useSelector } from "react-redux";
import { setBasePrice, updateTotalOrderPrice } from "../slice/cartSlice";

const BurgerCard = (props) => {
  const dispatch = useDispatch();

  ///////////////////////  РАБОТАЕМ С СОХРАНЕНИЕМ ДАННЫХ В КОРЗИНУ ЧЕРЕЗ localstorage    /////////////////////////////
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    // dispatch action to update the cart with loaded data

    if (cartData.length > 0) {
      cartData.forEach((item) => {
        const basePizzaPrice = parseFloat(item.price) / item.quantity;
        dispatch(
          addToCartPizza({
            pizzaId: item.pizzaId,
            price: item.price,
            size: item.size,
            name: item.name,
            image: item.image,
            count: item.quantity,
          })
        );
        dispatch(
          setBasePrice({ pizzaId: item.pizzaId, price: basePizzaPrice })
        );
        dispatch(updateTotalOrderPrice());
      });
    }
  }, []);

  // ОСНОВНОЙ массив куда записываюися ВСЕ добавленные пиццы в мою корзину (каждая пицца в отдельный объект)
  const cartItems = useSelector((state) => state.cart.cartItems);

  // функция для сохранения данных КОРЗИНЫ в localstorage
  useEffect(() => {
    saveCartToLocalStorage(cartItems);
  }, [cartItems]);

  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const burgerCount = useSelector(
    (state) => state.burger.burgerCount[props.thisBurgerId]
  );

  const burgerPrice = useSelector(
    (state) =>
      state.burger.burgerPrices[props.thisBurgerId] || props.thisBurgerPrice
  );

  const burgerPricesInCart = useSelector(
    (state) => state.burger.burgerPricesInCart
  );

  const allBurgersInCart = useSelector(
    (state) => state.burger.allBurgersInCart
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

  const handleAddToCart = (burgerId) => {
    // Сделаем проверку если такие бургеры уже есть в корзине
    const burgersInCart = allBurgersInCart.find(
      (item) => item.burgerId === burgerId
    );
    if (burgersInCart) {
      const currentPrice = burgerPricesInCart[burgerId];
      const newPrice = parseFloat(currentPrice) + parseFloat(burgerPrice);
      dispatch(
        updateCart({
          burgerId: burgerId,
          count: burgerCount.count + burgerCount,
          price: newPrice,
        })
      );
      dispatch(updateTotalOrderPrice());
    } else {
      dispatch(
        addToCartBurger({
          burgerId: burgerId,
          name: props.thisBurgerName,
          price: burgerPrice,
          count: burgerCount,
          image: props.thisBurgerImage,
        })
      );
      dispatch(updateTotalOrderPrice());
    }
  };

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
