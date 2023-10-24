import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAsia,
  faPhone,
  faAt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

import {
  faInstagram,
  faYoutube,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

import logo from "../images/logo-pizzza.svg";

import "./footer.css";

const earth = <FontAwesomeIcon icon={faEarthAsia} />;
const phone = <FontAwesomeIcon icon={faPhone} />;
const email = <FontAwesomeIcon icon={faAt} />;
const clock = <FontAwesomeIcon icon={faClock} />;

const instagram = <FontAwesomeIcon icon={faInstagram} />;
const facebook = <FontAwesomeIcon icon={faFacebook} />;
const twitter = <FontAwesomeIcon icon={faTwitter} />;
const youtube = <FontAwesomeIcon icon={faYoutube} />;

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="about-us">
            <div className="adress">
              <h6 className="about-us-h">{earth} Our location</h6>
              <p className="about-us-p">Raņķa dambis 30, Rīga</p>
            </div>
            <div className="phone-number">
              <h6 className="about-us-h">{phone} Information phone</h6>
              <p className="about-us-p">29544442</p>
            </div>
            <div className="email">
              <h6 className="about-us-h">{email} Our email</h6>
              <p className="about-us-p">test@gmail.com</p>
            </div>
          </div>
          <div className="working-hours">
            <div className="work-hours-bar">
              <h6 className="about-us-h">{clock} Working hours</h6>
            </div>
            <div className="work-days">
              <div className="workdays-bar">
                <div className="day">
                  Monday <span className="working-days-p">8:00 - 21:00</span>
                </div>
                <div className="day">
                  Tueday <span className="working-days-p">8:00 - 21:00</span>
                </div>
                <div className="day">
                  Wednesday <span className="working-days-p">8:00 - 21:00</span>
                </div>
                <div className="day">
                  Thursday <span className="working-days-p">8:00 - 21:00</span>
                </div>
                <div className="day">
                  Friday <span className="working-days-p">8:00 - 21:00</span>
                </div>
              </div>
            </div>
            <div className="weekends">
              <div className="workdays-bar">
                <div className="day">
                  Saturday <span className="working-days-p">10:00 - 20:00</span>
                </div>
                <div className="day">
                  Sunday <span className="working-days-p">10:00 - 20:00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="social-media">
            <div className="follow">Follow us on social media</div>
            <div className="social-media-bar">
              <a
                href="#"
                style={{ background: "purple" }}
                className="icon-bar"
                title="CHES PIZZA Instagram "
              >
                <i className="icon">{instagram}</i>
              </a>
              <a
                href="#"
                style={{ background: "red" }}
                className="icon-bar"
                title="CHES PIZZA YouTube"
              >
                <i className="icon">{youtube}</i>
              </a>
              <a
                href="#"
                style={{ background: "blue" }}
                className="icon-bar"
                title="CHES PIZZA Facebook"
              >
                <i className="icon">{facebook}</i>
              </a>
              <a
                href="#"
                style={{ background: "aqua" }}
                className="icon-bar"
                title="CHES PIZZA Twitter"
              >
                <i className="icon">{twitter}</i>
              </a>
            </div>
          </div>
          <div className="ches-pizza">
            <div>
              <img className="logo" src={logo} alt="" />
            </div>
            <div className="about-company">
              <h2 className="recipe-description">
                CHES PIZZA is the best pizza in Latvia!{" "}
              </h2>
              <p className="recipe-description-p">
                Here, everyone will be able to find their real taste. Our pizza
                is prepared according to the best Italian recipes.
              </p>
              <p className="recipe-description-p">
                Each pizza has its own unique taste due to the use of special
                dough and sauce.
              </p>
              <p className="recipe-description-p">
                Don't miss the opportunity to try the most delicious pizza in
                Latvia!
              </p>
              <p className="recipe-description-p">
                All you have to do is place an order and within an hour our
                courier will deliver your aromatic and delicious pizza.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
