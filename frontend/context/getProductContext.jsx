import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getProductsService from "../services/productServices";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    const AllProducts = getProductsService()

    useEffect(() => {
        setTimeout(() => {
            const product = AllProducts.find((product) => product.id === parseInt(id));
            setProduct(product)
            setLoading(false)
        },1500)
    },[id])

    return <ProductContext.Provider value={{product,loading}}>
        {children}
    </ProductContext.Provider>;
};