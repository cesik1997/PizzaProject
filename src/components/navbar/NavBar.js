import React from "react";
import Pizza from "../images/icons/pizza.png";
import Burgers from "../images/icons/burger.png";
import Snack from "../images/icons/snack.png";
import Drink from "../images/icons/drink.png";

import { glass } from "../fontawesome-icons/icons";

import { Link } from "react-router-dom";

import "./navbar.css";

const NavBar = () => {
  return (
    <div className="navbar2">
      <div className="nav-top">
        <div className="nav-top-content">
          <div className="nav-items-menu">
            <div className="food-icon">
              <a href="/pizza-page">
                <div className="food-filter">
                  <img className="food-img" src={Pizza} alt="" />
                </div>
                Pizza
              </a>
            </div>
            <div className="food-icon">
              <a href="/burger-page">
                <div className="food-filter">
                  <img className="food-img" src={Burgers} alt="" />
                </div>
                Burgers
              </a>
            </div>
            <div className="food-icon">
              <a href="/snacks-page">
                <div className="food-filter">
                  <img className="food-img" src={Snack} alt="" />
                </div>
                Snacks
              </a>
            </div>
            <div className="food-icon">
              <a href="/drinks-page">
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
