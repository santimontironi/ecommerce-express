import { createContext, useContext } from "react";

export const AllProductsContext = createContext();

export const useAllProducts = () => useContext(AllProductsContext);
