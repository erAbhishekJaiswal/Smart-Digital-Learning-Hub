import axios from "axios";
const BasseUrl = import.meta.env.VITE_BASE_URL


export const registerUser = async (data) => {
     const response = await axios.post(`${BasseUrl}/auth/register`, data);
     return response.data
};

export const loginUser = async (data) => {
    const response = await axios.post(`${BasseUrl}/auth/login`, data);
    return response.data
};