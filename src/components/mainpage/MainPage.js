import React from "react";
import PizzaCard from "../pizzacard/PizzaCard";

import "./mainpage.css";

import pizzaimg1 from "../images/10pizzas/1pizza.png";
import pizzaimg2 from "../images/10pizzas/2pizza.png";
import pizzaimg3 from "../images/10pizzas/3pizza.png";
import pizzaimg4 from "../images/10pizzas/4pizza.png";
import pizzaimg5 from "../images/10pizzas/5pizza.png";
import pizzaimg6 from "../images/10pizzas/6pizza.png";
import pizzaimg7 from "../images/10pizzas/7pizza.png";
import pizzaimg8 from "../images/10pizzas/8pizza.png";
import pizzaimg9 from "../images/10pizzas/9pizza.png";
import pizzaimg10 from "../images/10pizzas/10pizza.png";

const pizzaDataLeft = [
  {
    id: 1,
    image: pizzaimg1,
    name: "Supreme",
    description: "Cheese, ham, feta cheese, cherry tomato, dill, BBQ sauce",
    prices: {
      "30cm": "13.50 €",
      "40cm": "16.30 €",
      "50cm": "20.00 €",
    },
  },
  {
    id: 2,
    image: pizzaimg2,
    name: "Diavola",
    description: "Cheese, ham, mushrooms, pickles, pizza sauce",
    prices: {
      "30cm": "12.50 €",
      "40cm": "15.20 €",
      "50cm": "19.00 €",
    },
  },
  {
    id: 3,
    image: pizzaimg3,
    name: "Giovanni",
    description: "Cheese, ham, onion, salami, tomato sauce",
    prices: {
      "30cm": "12.50 €",
      "40cm": "15.20 €",
      "50cm": "19.00 €",
    },
  },
  {
    id: 4,
    image: pizzaimg4,
    name: "Jazzo",
    description: "Cheese, ham, bacon, pickles, dill, BBQ sauce",
    prices: {
      "30cm": "12.50 €",
      "40cm": "15.20 €",
      "50cm": "19.00 €",
    },
  },
  {
    id: 5,
    image: pizzaimg5,
    name: "Polina",
    description:
      "Cheese, mushrooms, chicken, paprika, tomato sauce, curry sauce",
    prices: {
      "30cm": "13.50 €",
      "40cm": "16.80 €",
      "50cm": "19.80 €",
    },
  },
];

const pizzaDataRight = [
  {
    id: 6,
    image: pizzaimg6,
    name: "Caesar",
    description:
      "Cheese, parmesan, chicken, roman salad, cherry tomato, pizza sauce, caesara sauce",
    prices: {
      "30cm": "14.50 €",
      "40cm": "17.80 €",
      "50cm": "20.60 €",
    },
  },
  {
    id: 7,
    image: pizzaimg7,
    name: "Azteca (Hot)",
    description:
      "Cheese, ham, jalapeno, tomato sauce, salsa sauce, cream sauce",
    prices: {
      "30cm": "13.50 €",
      "40cm": "16.20 €",
      "50cm": "19.80 €",
    },
  },
  {
    id: 8,
    image: pizzaimg8,
    name: "Acapulco (Hot)",
    description:
      "Cheese, fillet of beef, mushrooms, onion, jalapeno, salsa sauce, tomato sauce",
    prices: {
      "30cm": "13.50 €",
      "40cm": "16.50 €",
      "50cm": "20.00 €",
    },
  },
  {
    id: 9,
    image: pizzaimg9,
    name: "Rucollete",
    description:
      "Cheese, parmesan, arugula, olives, cherry tomato, mozzarella, pizza sauce",
    prices: {
      "30cm": "14.50 €",
      "40cm": "17.20 €",
      "50cm": "21.20 €",
    },
  },
  {
    id: 10,
    image: pizzaimg10,
    name: "Prosciutto",
    description: "Cheese, parmesan, prosciutto, arugula, pizza sauce",
    prices: {
      "30cm": "14.50 €",
      "40cm": "17.20 €",
      "50cm": "21.20 €",
    },
  },
];

const MainPage = (props) => {
  return (
    <div className="content">
      <div className="mainpage-container">
        <div className="menu-container-left">
          {pizzaDataLeft.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              id={pizza.id}
              image={pizza.image}
              name={pizza.name}
              description={pizza.description}
              price={pizza.prices} // Передаем все доступные размеры и цены
            />
          ))}
        </div>
        <div className="menu-container-right">
          {pizzaDataRight.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              id={pizza.id}
              image={pizza.image}
              name={pizza.name}
              description={pizza.description}
              price={pizza.prices} // Передаем все доступные размеры и цены
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
