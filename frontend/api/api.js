import axios from "axios";

const urlApi = import.meta.env.VITE_API_URL;

export const loginAdminApi = (data) => {
    return axios.post(`${urlApi}/login-admin`, data,{
        withCredentials: true
    });
}

export const addProductApi = (data) => {
    return axios.post(`${urlApi}/add-product`, data, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const dashboardAdminApi = () => {
    return axios.get(`${urlApi}/dashboard-admin`,{
        withCredentials: true
    });
}

export const getAllProductsAdminApi = () => {
    return axios.get(`${urlApi}/admin-productos`,{
        withCredentials: true
    });
}

export const getProductByIdApi = (id) => {
    return axios.get(`${urlApi}/producto/${id}`);
}

export const preferenceApi = (data) => {
    return axios.post(`${urlApi}/create-preference`, data);
}