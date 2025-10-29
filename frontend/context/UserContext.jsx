import { createContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { products, getProductByIdApi } from "../api/api";
import { Outlet } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = () => {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [allProducts, setAllProducts] = useState([]);

    const [productById, setProductById] = useState({});

    useEffect(() => {
        async function getAllProducts() {
            try{
                const res = await products();
                setAllProducts(res.data.products);
            }
            catch(error){
                setAllProducts([]);
                throw error
            }
            finally{
                setTimeout(() => {
                    setLoading(false);
                },1500)
            }
        }
        getAllProducts()
    }, [])

    useEffect(() => {
        async function getProduct(){
            try{
                const res = await getProductByIdApi(id);
                setProductById(res.data.product);
            }
            catch(error){
                setProductById({});
                throw error
            }
            finally{
                setTimeout(() => {
                    setLoading(false);
                },1500)
            }
        }

        getProduct()

    }, [id])

    return <UserContext.Provider value={{ allProducts, loading, productById }}>
        <Outlet />
    </UserContext.Provider>;
}