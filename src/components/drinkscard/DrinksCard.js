import React from "react";
import { down, up } from "../fontawesome-icons/icons";

const DrinksCard = (props) => {
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
          <p style={{ letterSpacing: "0.5px" }}>{props.thisDrinkDescription}</p>
        </div>
        <div className="pizza-price">
          <div className="price">
            <span style={{ marginRight: "16px" }}>Price:</span>
            {props.thisDrinkPrice}
          </div>
          <div className="cart">
            <div className="cart-btn">
              <button className="addtocartbtn">
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
              <div className="pizza-count">{}</div>
              <div className="pizza-count-btns">
                <button className="pizzabtnup">{up}</button>
                <button className="pizzabtndown">{down}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinksCard;
