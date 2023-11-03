import React from "react";
import { useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Cart from "./components/cart/Cart";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import PizzaPage from "./components/pizzapage/PizzaPage";
import NavBar from "./components/navbar/NavBar";

import { Provider } from "react-redux";
import { store } from "./components/store/store";

import "./App.css";
import BurgerPage from "./components/burgerpage/BurgerPage";

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
            <Route path="/pizza-page" element={<PizzaPage />} />
            <Route path="/burger-page" element={<BurgerPage />} />
          </Routes>
          {/* <PizzaPage /> */}
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
