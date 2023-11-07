import React from "react";

import DrinksCard from "../drinkscard/DrinksCard";

import drinkimg1 from "../images/8drinks/drink1.png";
import drinkimg2 from "../images/8drinks/drink2.png";
import drinkimg3 from "../images/8drinks/drink3.png";
import drinkimg4 from "../images/8drinks/drink4.png";
import drinkimg5 from "../images/8drinks/drink5.png";
import drinkimg6 from "../images/8drinks/drink6.png";
import drinkimg7 from "../images/8drinks/drink7.png";
import drinkimg8 from "../images/8drinks/drink8.png";

const drinksDataLeft = [
  {
    id: 1,
    image: drinkimg1,
    name: "Coca Cola 0.5l",
    description: "Coca Cola original / Zero ",
    price: "3.50 €",
  },
  {
    id: 2,
    image: drinkimg2,
    name: "Sprite 0.5l",
    description: "Sprite original / Zero  ",
    price: "3.50 €",
  },
  {
    id: 3,
    image: drinkimg3,
    name: "Fresh juice 0.33l",
    description: "Fresh cold orange / apple / pineapple juice",
    price: "4.50 €",
  },
  {
    id: 4,
    image: drinkimg4,
    name: "RedBull 0.33l",
    description: "RedBull original / Zero ",
    price: "3.50 €",
  },
];
const drinksDataRight = [
  {
    id: 5,
    image: drinkimg5,
    name: "Ice Tea 0.5l",
    description: "Cold ice tea with lemon or peach taste",
    price: "3.50 €",
  },
  {
    id: 6,
    image: drinkimg6,
    name: "Sparkling Water 0.5l",
    description: "Sparkling water 'Mangali' ",
    price: "2.50 €",
  },
  {
    id: 7,
    image: drinkimg7,
    name: "Maple syrup iced coffee 0.33l",
    description: "Iced coffee with maple syrup ",
    price: "4.50 €",
  },
  {
    id: 8,
    image: drinkimg8,
    name: "Milkshake 0.33l",
    description:
      "Banana / strawberry / chocolate milkshake with oreo toppings ",
    price: "5.00 €",
  },
];
const DrinksPage = () => {
  return (
    <div className="content">
      <div className="mainpage-container">
        <div className="menu-container-left">
          {drinksDataLeft.map((drink) => (
            <DrinksCard
              key={drink.id}
              thisDrinkId={drink.id}
              thisDrinkImage={drink.image}
              thisDrinkName={drink.name}
              thisDrinkDescription={drink.description}
              thisDrinkPrice={drink.price} // Передаем все доступные размеры и цены
            />
          ))}
        </div>
        <div className="menu-container-right">
          {drinksDataRight.map((drink) => (
            <DrinksCard
              key={drink.id}
              thisDrinkId={drink.id}
              thisDrinkImage={drink.image}
              thisDrinkName={drink.name}
              thisDrinkDescription={drink.description}
              thisDrinkPrice={drink.price} // Передаем все доступные размеры и цены
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrinksPage;
