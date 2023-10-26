import React from "react";
import Pizza from "../images/pizza.png";
import Burgers from "../images/burger.png";
import Snack from "../images/snack.png";
import Drink from "../images/drink.png";

import { glass } from "../icons/fontawesome-icons/icons";

import "./navbar.css";

const NavBar = () => {
  return (
    <div className="navbar2">
      <div className="nav-top">
        <div className="nav-top-content">
          <div className="nav-items-menu">
            <div className="food-icon">
              <a href="#">
                <div className="food-filter">
                  <img className="food-img" src={Pizza} alt="" />
                </div>
                Pizza
              </a>
            </div>
            <div className="food-icon">
              <a href="#">
                <div className="food-filter">
                  <img className="food-img" src={Burgers} alt="" />
                </div>
                Burgers
              </a>
            </div>
            <div className="food-icon">
              <a href="#">
                <div className="food-filter">
                  <img className="food-img" src={Snack} alt="" />
                </div>
                Snacks
              </a>
            </div>
            <div className="food-icon">
              <a href="#">
                <div className="food-filter">
                  <img className="food-img" src={Drink} alt="" />
                </div>
                Drinks
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="nav-search">
        <div className="nav-search-style">
          <div className="bobo">
            <input className="search" type="text" placeholder="Search" />
            {glass}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
