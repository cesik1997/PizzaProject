import React, { useEffect } from "react";

import { clock, gift, coins, phone } from "../fontawesome-icons/icons";

import "./deliverypage.css";
import { loadCartData } from "../cartdata/loadCartData";
import { useDispatch } from "react-redux";

const DeliveryPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    loadCartData(dispatch);
  }, []);

  return (
    <div className="delivery-container">
      <div className="delivery-header">
        <div className="delivery-header-title">
          <h1 className="delivery-header-h">
            <span>DELIVERY</span>
          </h1>
        </div>
      </div>
      <div className="delivery-page">
        <div className="left-block">
          <div className="delivery-block">
            <div
              className="delivery-img"
              style={{ background: "rgb(15, 157, 88)" }}
            ></div>
            <div className="small-delivery-block">
              <h3 className="h-delivery">1. delivery area</h3>
              <p className="p-delivery" style={{ letterSpacing: "-0.2px" }}>
                Green area on map (orders are accepted until 21:00)
              </p>
              <div className="delivery-area-items">
                <div className="delivery-price">
                  <div className="icon-in-delivery">{coins}</div>
                  <div className="price-info">
                    <span className="p-delivery">Delivery price</span>
                    <span className="small-text">3.00€</span>
                  </div>
                </div>
                <div className="delivery-time">
                  <div className="icon-in-delivery">{clock}</div>
                  <div className="time-info">
                    <span className="p-delivery">Delivery time</span>
                    <span className="small-text">till 1 h</span>
                  </div>
                </div>
                <div className="delivery-bonus">
                  <div className="icon-in-delivery">{gift}</div>
                  <div className="bonus-info">
                    <span className="p-delivery">Order more than</span>
                    <span className="small-text"> 20€ - for free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="delivery-block">
            <div
              className="delivery-img"
              style={{ background: "rgb(251, 192, 45)" }}
            ></div>
            <div className="small-delivery-block">
              <h3 className="h-delivery">2. delivery area</h3>
              <p className="p-delivery" style={{ letterSpacing: "-0.2px" }}>
                Yellow area on map (orders are accepted until 21:00)
              </p>
              <div className="delivery-area-items">
                <div className="delivery-price">
                  <div className="icon-in-delivery">{coins}</div>
                  <div className="price-info">
                    <span className="p-delivery">Delivery price</span>
                    <span className="small-text">4.00€</span>
                  </div>
                </div>
                <div className="delivery-time">
                  <div className="icon-in-delivery">{clock}</div>
                  <div className="time-info">
                    <span className="p-delivery">Delivery time</span>
                    <span className="small-text">till 1.5 h</span>
                  </div>
                </div>
                <div className="delivery-bonus">
                  <div className="icon-in-delivery">{gift}</div>
                  <div className="bonus-info">
                    <span className="p-delivery">Order more than</span>
                    <span className="small-text"> 30€ - for free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="delivery-block">
            <div
              className="delivery-img"
              style={{ background: "rgb(165, 39, 20)" }}
            ></div>
            <div className="small-delivery-block">
              <h3 className="h-delivery">3. delivery area</h3>
              <p className="p-delivery" style={{ letterSpacing: "-0.2px" }}>
                Red area on map (orders are accepted until 21:00)
              </p>
              <div className="delivery-area-items">
                <div className="delivery-price">
                  <div className="icon-in-delivery">{coins}</div>
                  <div className="price-info">
                    <span className="p-delivery">Delivery price</span>
                    <span className="small-text">5.00€</span>
                  </div>
                </div>
                <div className="delivery-time">
                  <div className="icon-in-delivery">{clock}</div>
                  <div className="time-info">
                    <span className="p-delivery">Delivery time</span>
                    <span className="small-text">till 1.5 h</span>
                  </div>
                </div>
                <div className="delivery-bonus">
                  <div className="icon-in-delivery">{gift}</div>
                  <div className="bonus-info">
                    <span className="p-delivery">Order more than</span>
                    <span className="small-text"> 40€ - for free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-block">
          <iframe
            title="map"
            className="frame"
            src="https://www.google.com/maps/d/u/0/embed?mid=1imRyjMKkI0N780A0FPmOOaeIy_JSgCI&ehbc=2E312F"
            width="100%"
            height="100%"
          ></iframe>
        </div>
        <div className="bottom-block">
          <div className="delivery-img-bottom"></div>
          <div className="bottom-block-info">
            <div className="bottom-block-menu">
              <div className="phone-menu">
                <div className="phone-img">{phone}</div>
                <div className="phone-data">
                  <span className="p-delivery">
                    Call for delivery outside the specified areas
                  </span>
                  <span>29544442</span>
                </div>
              </div>
              <div className="time-menu">
                <div className="clock-img">{clock}</div>
                <div className="time-data">
                  <span className="p-delivery">
                    Delivery time during peak times
                  </span>
                  <span>can increase</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="delivery-rules-container">
        <h2 className="h2-delivery">Delivery rules</h2>
        <div className="delivery-rules">
          <div className="left-block-rules">
            <ul className="left-ul">
              <li className="rules-li">
                Zone 1 - minimum order amount €15, delivery amout 3.00€
              </li>
              <li className="rules-li">
                Zone 2 - minimum order amount 20€, delivery amout 4.00€
              </li>
              <li className="rules-li">
                Zone 3 - minimum order amount 30€, delivery amout 5.00€
              </li>
            </ul>
          </div>
          <div className="right-block-rules">
            <ul className="right-ul">
              <li className="rules-li">
                The delivery time is specified when ordering by phone
              </li>
              <li className="rules-li">
                Outside the specified areas, call 29544442 for delivery
              </li>
              <li className="rules-li">
                Delivery times may increase during peak periods.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
