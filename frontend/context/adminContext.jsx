import { createContext, useState } from "react";
import { loginAdminApi, dashboardAdminApi, getAllProductsAdminApi } from "../api/api";
import { Outlet } from "react-router-dom";

export const AdminContext = createContext();

export const AdminProvider = () => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(false);

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
            },1500)
        }
    };

    const getAdmin = async () => {
        try {
            setLoading(true);
            const res = await dashboardAdminApi();
            if(res.data.authenticated === false) {
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
            },1500)
        }
    };

    const getAllProducts = async () => {
        try {
            setLoading(true);
            const res = await getAllProductsAdminApi();
            return res.data;
        } catch (error) {
            throw error;
        } finally {
            setTimeout(() => {
                setLoading(false);
            },1500)
        }
    };

    return (
        <AdminContext.Provider value={{ admin, signInAdmin, loading, getAdmin, getAllProducts }}>
            <Outlet />
        </AdminContext.Provider>
    );
};