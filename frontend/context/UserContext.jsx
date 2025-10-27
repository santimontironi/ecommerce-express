import { createContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { products } from "../api/api";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    

    const [loading, setLoading] = useState(true);

    const [allProducts, setAllProducts] = useState([]);

    const [productById, setProductById] = useState({});

    useEffect(() => {
        setTimeout(() => {
            setAllProducts(products);
            setLoading(false);
        }, 1500)
    }, [products])

    useEffect(() => {
        setTimeout(() => {
            const product = allProducts.find((product) => product.id === parseInt(id));
            setProductById(product)
            setLoading(false)
        }, 1500)
    }, [])

    return <UserContext.Provider value={{ products, loading, allProducts, productById }}>
        {children}
    </UserContext.Provider>;
}