import React from "react";

import { arrow } from "../fontawesome-icons/icons";
import { squareInsta } from "../fontawesome-icons/icons";
import { squareTwitter } from "../fontawesome-icons/icons";
import { squareYoutube } from "../fontawesome-icons/icons";
import { Link } from "react-router-dom";
import "./mainpage.css";

const MainPage = () => {
  const redirect = () => {
    window.location.href = "/menu/pizzas";
  };

  return (
    <div className="page">
      <div className="container">
        <div className="mainpage-header">
          <div>
            <Link className="header-menu" to="/menu/pizzas">
              MENU
            </Link>
          </div>
          <div>
            <Link className="header-menu" to="/delivery">
              DELIVERY
            </Link>
          </div>
          <div>
            <Link className="header-menu" to="/about-us">
              ABOUT US
            </Link>
          </div>
        </div>
        <div className="mainpage">
          <div className="mainpage-container-new">
            <div className="mainpage-title">
              <div className="title-delicious">Delicious</div>
              <div className="title-pizza">Pizza</div>
            </div>
            <div className="mainpage-text">
              <p style={{ lineHeight: "21px" }}>
                Have you ever tried the most delicious pizza in the world?
                <br /> Don't miss the opportunity and order pizza now!
              </p>
            </div>
            <div className="button-container">
              <button className="btn-ordernow" onClick={redirect}>
                Order now {arrow}
              </button>
            </div>
          </div>
        </div>

        <div className="mainpage-footer">
          <div className="mainpage-socialmedia">
            <div className="main-instagram">{squareInsta}</div>
            <div className="main-twitter">{squareTwitter}</div>
            <div className="main-youtube">{squareYoutube}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
