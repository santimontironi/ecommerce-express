import { createContext, useState, useEffect } from "react"
import { products } from "../api/api";
import { Outlet } from "react-router-dom";

export const AllProductsContext = createContext();

export const AllProductsProvider = () => {

    const [loading, setLoading] = useState(false);

    const [allProducts, setAllProducts] = useState([]);

    
    useEffect(() => {
        async function getAllProducts() {
            setLoading(true);
            try{
                const res = await products();

                console.log('PRODUCTOS: ', res.data.products);

                setAllProducts(res.data.products);
            }
            catch(error){
                setAllProducts([]);
                throw error
            }
            finally{
                setTimeout(() => {
                    setLoading(false);
                },2000)
            }
        }
        getAllProducts()
    }, [])


    return <AllProductsContext.Provider value={{ allProducts, loading }}>
        <Outlet />
    </AllProductsContext.Provider>;
}