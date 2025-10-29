import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { products, getProductByIdApi } from "../api/api";

export const ProductByIdContext = createContext();

export const ProductByIdProvider = () => {

    const [productById, setProductById] = useState({});

    const { id } = useParams();

    useEffect(() => {
        async function getProduct(){
            setLoading(true);
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

    return (
        <ProductByIdContext.Provider value={{ productById }}>
            <Outlet />
        </ProductByIdContext.Provider>
    )
}