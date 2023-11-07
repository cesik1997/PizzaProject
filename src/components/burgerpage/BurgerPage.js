import React from "react";

import BurgerCard from "../burgercard/BurgerCard";

import burgerimg1 from "../images/6burgers/burger1.png";
import burgerimg2 from "../images/6burgers/burger2.png";
import burgerimg3 from "../images/6burgers/burger3.png";
import burgerimg4 from "../images/6burgers/burger4.png";
import burgerimg5 from "../images/6burgers/burger5.png";
import burgerimg6 from "../images/6burgers/burger6.png";

const burgerDataLeft = [
  {
    id: 1,
    image: burgerimg1,
    name: "Bacon King",
    description: "Cheese, bacon, 2 pattys of ground beef, ketchup, mayo ",
    price: "8.50 €",
  },
  {
    id: 2,
    image: burgerimg2,
    name: "Double Whopper ",
    description:
      "Cheese, 2 pattys of ground beef, tomato, lettuce, pickles, onion, mayo ",
    price: "10.00 €",
  },
  {
    id: 3,
    image: burgerimg3,
    name: "Cheeseburger",
    description: "Cheese, patty of ground beef, pickles, ketchup, mustard ",
    price: "6.00 €",
  },
];
const burgerDataRight = [
  {
    id: 4,
    image: burgerimg4,
    name: "Double Cheeseburger",
    description: "Cheese, 2 pattys of ground beef, pickles, ketchup, mustard ",
    price: "8.50 €",
  },
  {
    id: 5,
    image: burgerimg5,
    name: "Big King",
    description:
      "Cheese, 2 pattys of ground beef, lettuce, pickles, onion, BigKing sauce ",
    price: "10.00 €",
  },
  {
    id: 6,
    image: burgerimg6,
    name: "Chili Cheese",
    description:
      "Cheese, 2 pattys of ground beef, halapeno, cheese-chili sauce ",
    price: "8.50 €",
  },
];
const BurgerPage = () => {
  return (
    <div className="content">
      <div className="mainpage-container">
        <div className="menu-container-left">
          {burgerDataLeft.map((burger) => (
            <BurgerCard
              key={burger.id}
              thisBurgerId={burger.id}
              thisBurgerImage={burger.image}
              thisBurgerName={burger.name}
              thisBurgerDescription={burger.description}
              thisBurgerPrice={burger.price} // Передаем все доступные размеры и цены
            />
          ))}
        </div>
        <div className="menu-container-right">
          {burgerDataRight.map((burger) => (
            <BurgerCard
              key={burger.id}
              thisBurgerId={burger.id}
              thisBurgerImage={burger.image}
              thisBurgerName={burger.name}
              thisBurgerDescription={burger.description}
              thisBurgerPrice={burger.price} // Передаем все доступные размеры и цены
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BurgerPage;
