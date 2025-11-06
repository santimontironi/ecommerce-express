import { createContext, useState, useEffect } from "react";
import { loginAdminApi, dashboardAdminApi, getAllProductsAdminApi, addProductApi, deleteProductApi, logoutAdminApi, sendMessageApi } from "../api/api";
import { Outlet } from "react-router-dom";

export const AdminContext = createContext();

export const AdminProvider = ({children}) => {
    const [admin, setAdmin] = useState(null);
    const [loginLoading, setLoginLoading] = useState(false);
    const [dashboardLoading, setDashboardLoading] = useState(true);
    const [productsLoading,setProductsLoading] = useState(true);
    const [messageLoading,setMessageLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const signInAdmin = async (data) => {
        setLoginLoading(true);
        try {
            const res = await loginAdminApi(data);
            setAdmin(res.data.admin);
            return res.data;
        } catch (error) {
            setAdmin(null);
            throw error;
        } finally {
            setTimeout(() => {
                setLoginLoading(false);
            }, 5000)
        }
    };

    useEffect(() => {
        const getAdmin = async () => {
            try {
                const res = await dashboardAdminApi();
                if (res.data.authenticated === false) {
                    setAdmin(null)
                }
                setAdmin(res.data.admin);
                return res.data;
            } catch (error) {
                setAdmin(null);
                throw error;
            } finally {
                setTimeout(() => {
                    setDashboardLoading(false);
                }, 2000)
            }
        };
        getAdmin();
    }, [])


    useEffect(() => {
        const getAllProducts = async () => {
            if(!admin) return
            setProductsLoading(true);
            try {
                const res = await getAllProductsAdminApi();
                setProducts(res.data.products);
            } catch (error) {
                throw error;
            }
            finally{
                setTimeout(() => {
                    setProductsLoading(false);
                },2000)
            }
        };
        getAllProducts();
    }, [admin])


    const addProduct = async (data) => {
        try {
            const res = await addProductApi(data);
            if (res.data.product) {
                setProducts((prev) => [...prev, res.data.product]);
            }
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const res = await deleteProductApi(productId);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    const logoutAdmin = async () => {
        try {
            const res = await logoutAdminApi();
            setAdmin(null);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    const sendMessage = async (data) => {
        setMessageLoading(true);
        try {
            const res = await sendMessageApi(data);
            return res.data;
        } catch (error) {
            throw error;
        }
        finally{
            setTimeout(() => {
                setMessageLoading(false);
            },2000)
        }
    }

    return (
        <AdminContext.Provider value={{
            admin,
            signInAdmin,
            loginLoading,
            dashboardLoading,
            products,
            addProduct,
            deleteProduct,
            setProducts,
            productsLoading,
            logoutAdmin,
            sendMessage,
            messageLoading
        }}>
            {children || <Outlet />}
        </AdminContext.Provider>
    );
};