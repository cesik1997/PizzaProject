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
    name: "Coca Cola ",
    description: "Coca Cola original / Zero ",
    price: "3.50 €",
    size: "500ml",
    type: "drink",
  },
  {
    id: 2,
    image: drinkimg2,
    name: "Sprite ",
    description: "Sprite original / Zero  ",
    price: "3.50 €",
    size: "500ml",
    type: "drink",
  },
  {
    id: 3,
    image: drinkimg3,
    name: "Fresh juice",
    description: "Fresh cold orange / apple / pineapple juice",
    price: "4.50 €",
    size: "330ml",
    type: "drink",
  },
  {
    id: 4,
    image: drinkimg4,
    name: "RedBull",
    description: "RedBull original / Zero ",
    price: "3.50 €",
    size: "330ml",
    type: "drink",
  },
];
const drinksDataRight = [
  {
    id: 5,
    image: drinkimg5,
    name: "Ice Tea",
    description: "Cold ice tea with lemon or peach taste",
    price: "3.50 €",
    size: "500ml",
    type: "drink",
  },
  {
    id: 6,
    image: drinkimg6,
    name: "Sparkling Water",
    description: "Sparkling water 'Mangali' ",
    price: "2.50 €",
    size: "500ml",
    type: "drink",
  },
  {
    id: 7,
    image: drinkimg7,
    name: "Iced coffee ",
    description: "Iced coffee with maple syrup ",
    price: "4.50 €",
    size: "330ml",
    type: "drink",
  },
  {
    id: 8,
    image: drinkimg8,
    name: "Milkshake ",
    description:
      "Banana / strawberry / chocolate milkshake with oreo toppings ",
    price: "5.00 €",
    size: "330ml",
    type: "drink",
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
              thisDrinkSize={drink.size}
              thisDrinkType={drink.type}
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
              thisDrinkSize={drink.size}
              thisDrinkType={drink.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrinksPage;
