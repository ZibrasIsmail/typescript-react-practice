import { useState } from "react";

import Cart from "./Cart.tsx";
import { useCartSelector } from "../store/hook.ts";

export default function Header() {
  const totalQuantity = useCartSelector((state) =>
    state.cart.items.reduce((cur, item) => cur + item.quantity, 0)
  );
  const [cartIsVisible, setCartIsVisible] = useState(false);

  function handleOpenCartClick() {
    setCartIsVisible(true);
  }

  function handleCloseCartClick() {
    setCartIsVisible(false);
  }

  return (
    <>
      {cartIsVisible && <Cart onClose={handleCloseCartClick} />}
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Redux</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({totalQuantity})</button>
        </p>
      </header>
    </>
  );
}
