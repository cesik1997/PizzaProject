import React from "react";
import { useState } from "react";

import Cart from "./components/cart/Cart";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import MainPage from "./components/mainpage/MainPage";
import NavBar from "./components/navbar/NavBar";

import { Provider } from "react-redux";
import { store } from "./components/store/store";

import "./App.css";

function App(props) {
  const [cartVisible, setCartVisible] = useState(false);

  // Определяем id пиццы, которую пользователь добавил в корзину
  const [pizzaIdInCart, setPizzaIdInCart] = useState(null);

  const toggleCartVisible = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <div className="App">
      <Provider store={store}>
        <Header toggleCartVisible={toggleCartVisible} />
        <NavBar />
        <MainPage />
        <Footer />
        <Cart
          cartVisible={cartVisible}
          toggleCartVisible={toggleCartVisible}
          id={pizzaIdInCart}
        />
      </Provider>
    </div>
  );
}

export default App;
