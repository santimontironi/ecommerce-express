import { createContext, useState } from "react";
import { loginAdminApi } from "../api/api";
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

    return (
        <AdminContext.Provider value={{ admin, signInAdmin, loading }}>
            <Outlet />
        </AdminContext.Provider>
    );
};