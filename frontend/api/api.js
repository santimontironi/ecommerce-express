import axios from "axios";

const urlApi = import.meta.env.VITE_API_URL;

export const preferenceApi = (data) => {
    return axios.post(`${urlApi}/create-preference`, data);
}