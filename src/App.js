import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";

let initialLoad = true;

function App() {
  const cart = useSelector((state) => state.cart);
  const showCart = useSelector((state) => state.ui.cartIsShown);
  const notification = useSelector((state) => state.ui.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Pending",
          message: "Adding your cart items...",
        })
      );
      
      const response = await fetch(
        "https://rduxcart-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (response.ok) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Successful",
            message: "Cart items added!",
          })
        );
      }
    };

    if (initialLoad) {
      initialLoad = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Something went wrong :(",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
