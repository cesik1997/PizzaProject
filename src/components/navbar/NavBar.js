import React from "react";
import Pizza from "../images/icons/pizza.png";
import Burgers from "../images/icons/burger.png";
import Snack from "../images/icons/snack.png";
import Drink from "../images/icons/drink.png";

import { Link } from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
  return (
    <div className="navbar2">
      <div className="nav-top">
        <div className="nav-top-content">
          <div className="nav-items-menu">
            <div className="food-icon">
              <Link to="/menu/pizzas">
                <div className="food-filter">
                  <img className="food-img" src={Pizza} alt="" />
                </div>
                Pizza
              </Link>
            </div>
            <div className="food-icon">
              <Link to="/menu/burgers">
                <div className="food-filter">
                  <img className="food-img" src={Burgers} alt="" />
                </div>
                Burgers
              </Link>
            </div>
            <div className="food-icon">
              <Link to="/menu/snacks">
                <div className="food-filter">
                  <img className="food-img" src={Snack} alt="" />
                </div>
                Snacks
              </Link>
            </div>
            <div className="food-icon">
              <Link to="/menu/drinks">
                <div className="food-filter">
                  <img className="food-img" src={Drink} alt="" />
                </div>
                Drinks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
