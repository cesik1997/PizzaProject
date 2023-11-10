import React from "react";
import Pizza from "../images/icons/pizza.png";
import Burgers from "../images/icons/burger.png";
import Snack from "../images/icons/snack.png";
import Drink from "../images/icons/drink.png";

import { glass } from "../fontawesome-icons/icons";
import "./navbar.css";

const NavBar = () => {
  return (
    <div className="navbar2">
      <div className="nav-top">
        <div className="nav-top-content">
          <div className="nav-items-menu">
            <div className="food-icon">
              <a href="/menu/pizzas">
                <div className="food-filter">
                  <img className="food-img" src={Pizza} alt="" />
                </div>
                Pizza
              </a>
            </div>
            <div className="food-icon">
              <a href="/menu/burgers">
                <div className="food-filter">
                  <img className="food-img" src={Burgers} alt="" />
                </div>
                Burgers
              </a>
            </div>
            <div className="food-icon">
              <a href="/menu/snacks">
                <div className="food-filter">
                  <img className="food-img" src={Snack} alt="" />
                </div>
                Snacks
              </a>
            </div>
            <div className="food-icon">
              <a href="/menu/drinks">
                <div className="food-filter">
                  <img className="food-img" src={Drink} alt="" />
                </div>
                Drinks
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
