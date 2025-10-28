import { createContext, useState, useEffect } from "react";
import { loginAdminApi, dashboardAdminApi, getAllProductsAdminApi, addProductApi, deleteProductApi, logoutAdminApi } from "../api/api";
import { Outlet } from "react-router-dom";

export const AdminContext = createContext();

export const AdminProvider = () => {
    const [admin, setAdmin] = useState(null);
    const [loginLoading, setLoginLoading] = useState(false);
    const [dashboardLoading, setDashboardLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const signInAdmin = async (data) => {
        try {
            setLoginLoading(true);
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
            try {
                
                const res = await getAllProductsAdminApi();
                setProducts(res.data.products || []);
            } catch (error) {
                throw error;
            }
        };
        getAllProducts();
    }, [])


    const addProduct = async (data) => {
        try {
            const res = await addProductApi(data);
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
            logoutAdmin 
        }}>
            <Outlet />
        </AdminContext.Provider>
    );
};