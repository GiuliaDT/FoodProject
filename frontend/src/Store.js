import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const newProduct = action.payload;
      const addedProduct = state.cart.cartItems.find(
        (item) => item._id === newProduct._id
      );

      const cartItems = addedProduct
        ? state.cart.cartItems.map((item) =>
            item._id === addedProduct._id ? newProduct : item
          )
        : [...state.cart.cartItems, newProduct];
      return {
        ...state,
        cart: { ...state.cart, cartItems },
      };

    default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
