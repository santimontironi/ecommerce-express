import axios from "axios";

const urlApi = import.meta.env.VITE_API_URL;

export const loginAdminApi = (data) => {
    return axios.post(`${urlApi}/login-admin`, data);
}

export const registerAdminApi = (data) => {
    return axios.post(`${urlApi}/register-admin`, data);
}

export const addProductApi = (data) => {
    return axios.post(`${urlApi}/add-product`, data);
}

export const preferenceApi = (data) => {
    return axios.post(`${urlApi}/create-preference`, data);
}