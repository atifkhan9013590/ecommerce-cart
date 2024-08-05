import React, { createContext, useReducer } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
export const CartContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCT":
      return { ...state, products: action.payload };

    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };

    case "REMOVE_PRODUCT":
      return {
        ...state,
        carts: state.carts.filter((prd) => prd.id !== action.payload),
      };

    case "CHANGE_QUNATITY":
      return {
        ...state,
        carts: state.carts.map((prd) =>
          prd.id === action.payload.id
            ? { ...prd, quantity: prd.quantity + action.payload.change }
            : prd
        ),
      };

    case "ADD_TO_CART":
      const existingProduct = state.carts.find(
        (prd) => prd.id === action.payload.id
      );
      if (existingProduct) {
           toast.success("Cart Quantity updated");
        return {
          ...state,
          carts: state.carts.map((prd) =>
            prd.id === action.payload.id
              ? { ...prd, quantity: prd.quantity + 1 }
              : prd
          ),
        };
     
      } else {
         toast.success("Added to Cart");
        return {
          ...state,
          carts: [...state.carts, { ...action.payload, quantity: 1 }],
        };
       
      }

    case "CLEAR_CART":
      return { ...state, carts: [] };

    default:
      return state;
  }
};

const initialstate = {
  products: [],
  categories: [],
  carts: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialstate);

  const GetProducts = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=30");
      const productsWithQuantity = res.data.products.map((prd) => ({
        ...prd,
        quantity: 1,
      }));
      dispatch({ type: "SET_PRODUCT", payload: productsWithQuantity });
    } catch (err) {
      console.log(err);
    }
  };

  const GetCategories = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products/categories");
      dispatch({ type: "SET_CATEGORIES", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

 

  return (
    <CartContext.Provider
      value={{ state, dispatch, GetProducts, GetCategories }}
    >
      {children}
    </CartContext.Provider>
  );
};
