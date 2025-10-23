import { createContext, useState, useEffect } from "react";
import { loginAdminApi, dashboardAdminApi, getAllProductsAdminApi, addProductApi } from "../api/api";
import { Outlet } from "react-router-dom";

export const AdminContext = createContext();

export const AdminProvider = () => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [correct, setCorrect] = useState(false);

    const signInAdmin = async (data) => {
        try {
            setLoading(true);
            const res = await loginAdminApi(data);
            setAdmin(res.data.admin);
            return res.data;
        } catch (error) {
            setAdmin(null);
            throw error;
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1500)
        }
    };

    useEffect(() => {
        const getAdmin = async () => {
            try {
                setLoading(true);
                const res = await dashboardAdminApi();
                if (res.data.authenticated === false) {
                    setAdmin(null)
                    return
                }
                setAdmin(res.data.admin);
                return res.data;
            } catch (error) {
                setAdmin(null);
                throw error;
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1500)
            }
        };
        getAdmin();
    }, [])


    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await getAllProductsAdminApi();
                setProducts(res.data.products);
            } catch (error) {
                throw error;
            }
        };
        getAllProducts();
    }, [])


    const addProduct = async (data) => {
        try {
            setLoading(true);
            const res = await addProductApi(data);
            setCorrect(true);

            setTimeout(() => {
                setCorrect(false);
            },2000)
            
            return res.data;
        } catch (error) {
            throw error;
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1500)
        }
    };

    return (
        <AdminContext.Provider value={{ admin, signInAdmin, loading, products, addProduct, correct }}>
            <Outlet />
        </AdminContext.Provider>
    );
};