import React, { createContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem("cart_items") || "[]"),
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const item = action.payload;
      // check if exists -> increment quantity
      const exists = state.items.find((it) => it._id === item._id);
      let newItems;
      if (exists) {
        newItems = state.items.map((it) =>
          it._id === item._id ? { ...it, quantity: it.quantity + 1 } : it
        );
      } else {
        newItems = [...state.items, { ...item, quantity: 1 }];
      }
      return { ...state, items: newItems };
    }
    case "REMOVE_ITEM": {
      const id = action.payload;
      const newItems = state.items.filter((it) => it._id !== id);
      return { ...state, items: newItems };
    }
    case "CHANGE_QUANTITY": {
      const { id, quantity } = action.payload;
      const newItems = state.items.map((it) =>
        it._id === id ? { ...it, quantity } : it
      ).filter(it => it.quantity > 0);
      return { ...state, items: newItems };
    }
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product) => dispatch({ type: "ADD_ITEM", payload: product });
  
  const removeFromCart = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const changeQty = (id, quantity) => dispatch({ type: "CHANGE_QUANTITY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider value={{ cart: state.items, addItem, removeFromCart, changeQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
