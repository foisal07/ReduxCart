import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const cart = useSelector((state) => state.cart);
  const showCart = useSelector((state) => state.ui.cartIsShown);

  useEffect(() => {
    
    const sendCartData = async () => {
      const response = await fetch(
        "https://rduxcart-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
    };

    sendCartData();
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
