import React from "react";

import SnacksCard from "../snackscard/SnacksCard";

import snackimg1 from "../images/6snacks/snack1.png";
import snackimg2 from "../images/6snacks/snack2.png";
import snackimg3 from "../images/6snacks/snack3.png";
import snackimg4 from "../images/6snacks/snack4.png";
import snackimg5 from "../images/6snacks/snack5.png";
import snackimg6 from "../images/6snacks/snack6.png";

const snacksDataLeft = [
  {
    id: 1,
    image: snackimg1,
    name: "Onion Rings ",
    description:
      "Our thick-cut onion rings are made from whole white onions, battered with a subtle blend of spices, letting the onion’s natural sweetness shine through.",
    price: "4.00 €",
    size: "10pcs",
  },
  {
    id: 2,
    image: snackimg2,
    name: "Cheesy Mashed potato pancakes ",
    description:
      "A nice crispy crust with a soft mashed potato pillow in the center. Yum!",
    price: "4.50 €",
    size: "5pcs",
  },
  {
    id: 3,
    image: snackimg3,
    name: "Mozzarella sticks",
    description:
      "The combination of mozzarella and cheddar cheese string sticks adds much flavor to them. Also, the panko crumbs topping and the flour mixture give them that irresistible and crispy coating.",
    price: "4.00 €",
    size: "8pcs",
  },
];
const snacksDataRight = [
  {
    id: 4,
    image: snackimg4,
    name: "French Fries",
    description:
      "An original favourite and the one and only fry you’ll ever need in your life. Fried crisp and golden, with the perfect amount of salt. ",
    price: "4.00 €",
    size: "200g",
  },
  {
    id: 5,
    image: snackimg5,
    name: "Chicken nuggets",
    description:
      "Golden crisp crust with juicy chicken meat and subtle oregano flavours makes the Chicken Nuggets an all-time favourite loved by kids and adults alike. ",
    price: "4.50 €",
    size: "8pcs",
  },
  {
    id: 6,
    image: snackimg6,
    name: "Squid rings",
    description:
      "Squid rings are chewy, subtle in flavour yet perfect as a snack or side dish. Coat it with some crispy flour, eggs and bread crumbs and we have a lovely crunch on the outside with a chewy texture on the inside.",
    price: "4.50 €",
    size: "10pcs",
  },
];
const SnacksPage = () => {
  return (
    <div className="content">
      <div className="mainpage-container">
        <div className="menu-container-left">
          {snacksDataLeft.map((snack) => (
            <SnacksCard
              key={snack.id}
              thisSnackId={snack.id}
              thisSnackImage={snack.image}
              thisSnackName={snack.name}
              thisSnackDescription={snack.description}
              thisSnackPrice={snack.price} // Передаем все доступные размеры и цены
              thisSnackSize={snack.size}
            />
          ))}
        </div>
        <div className="menu-container-right">
          {snacksDataRight.map((snack) => (
            <SnacksCard
              key={snack.id}
              thisSnackId={snack.id}
              thisSnackImage={snack.image}
              thisSnackName={snack.name}
              thisSnackDescription={snack.description}
              thisSnackPrice={snack.price} // Передаем все доступные размеры и цены
              thisSnackSize={snack.size}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SnacksPage;
