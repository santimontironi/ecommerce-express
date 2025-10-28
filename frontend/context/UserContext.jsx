import { createContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { products } from "../api/api";
import { Outlet } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = () => {

    const { id } = useParams();

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
    }, [id])

    return <UserContext.Provider value={{ loading, allProducts, productById }}>
        <Outlet />
    </UserContext.Provider>;
}