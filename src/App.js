import React from "react";
import { useState } from "react";

import { Provider } from "react-redux";
import { store } from "./components/store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Cart from "./components/cart/Cart";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import NavBar from "./components/navbar/NavBar";

import PizzaPage from "./components/pizzapage/PizzaPage";
import BurgerPage from "./components/burgerpage/BurgerPage";
import DrinksPage from "./components/drinkspage/DrinksPage";
import SnacksPage from "./components/snackspage/SnacksPage";

import "./App.css";
function App(props) {
  const [cartVisible, setCartVisible] = useState(false);

  const toggleCartVisible = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <Router>
      <div className="App">
        <Provider store={store}>
          <Header toggleCartVisible={toggleCartVisible} />
          <NavBar />
          <Routes>
            <Route path="/menu/pizzas" element={<PizzaPage />} />
            <Route path="/menu/burgers" element={<BurgerPage />} />
            <Route path="/menu/snacks" element={<SnacksPage />} />
            <Route path="/menu/drinks" element={<DrinksPage />} />
          </Routes>
          <Footer />
          <Cart
            cartVisible={cartVisible}
            toggleCartVisible={toggleCartVisible}
          />
        </Provider>
      </div>
    </Router>
  );
}

export default App;
