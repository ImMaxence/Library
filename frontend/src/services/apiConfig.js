import axios from 'axios';
import { logout } from '../services/authService'
import { useNavigate } from 'react-router-dom';

export const api = axios.create({
    baseURL: process.env.REACT_APP_URL_BACK,
    withCredentials: true,
});

api.interceptors.request.use(
    async (config) => {
        // refresh token ici plus tard
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            console.log("Token expiré ou invalide");
            let navigate = useNavigate()
            logout();
            navigate('/');
        }
        return Promise.reject(error);
    }
);

export default api;
