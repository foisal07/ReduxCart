import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
  totalQuanitity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addCartItem(state){
      state.items.push({
        
      })
    }
  },
});

export default cartSlice;
