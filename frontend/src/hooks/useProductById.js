import { createContext, useContext } from "react";

export const ProductByIdContext = createContext();

export const useProductById = () => useContext(ProductByIdContext);
