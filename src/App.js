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

import MainPage from "./components/mainpage/MainPage";
import DeliveryPage from "./components/deliverypage/DeliveryPage";
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
          <Routes>
            <Route path="/mainpage" element={<MainPage />} />
            <Route
              path="/delivery"
              element={
                <>
                  <Header /> <DeliveryPage /> <Footer />{" "}
                </>
              }
            />
            <Route
              path="/menu/pizzas"
              element={
                <>
                  <Header toggleCartVisible={toggleCartVisible} />
                  <NavBar />
                  <PizzaPage /> <Footer />
                  <Cart
                    cartVisible={cartVisible}
                    toggleCartVisible={toggleCartVisible}
                  />
                </>
              }
            />
            <Route
              path="/menu/burgers"
              element={
                <>
                  <Header toggleCartVisible={toggleCartVisible} />
                  <NavBar />
                  <BurgerPage /> <Footer />
                  <Cart
                    cartVisible={cartVisible}
                    toggleCartVisible={toggleCartVisible}
                  />
                </>
              }
            />
            <Route
              path="/menu/snacks"
              element={
                <>
                  <Header toggleCartVisible={toggleCartVisible} />
                  <NavBar />
                  <SnacksPage /> <Footer />
                  <Cart
                    cartVisible={cartVisible}
                    toggleCartVisible={toggleCartVisible}
                  />
                </>
              }
            />
            <Route
              path="/menu/drinks"
              element={
                <>
                  <Header toggleCartVisible={toggleCartVisible} />
                  <NavBar />
                  <DrinksPage /> <Footer />
                  <Cart
                    cartVisible={cartVisible}
                    toggleCartVisible={toggleCartVisible}
                  />
                </>
              }
            />
          </Routes>
        </Provider>
      </div>
    </Router>
  );
}

export default App;
