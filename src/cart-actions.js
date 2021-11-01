import { cartActions } from "./store/cart-slice";
import { uiActions } from "./store/ui-slice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Pending",
        message: "Updating your cart...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://rduxcart-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed!");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Successful",
          message: "Cart updated!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Something went wrong :(",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://rduxcart-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );
      const data = await response.json();
      return data;
    };
    try {
      const storedItems = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: storedItems.items,
          totalQuantity: storedItems.totalQuantity,
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Something went wrong :(",
        })
      );
    }
  };
};
