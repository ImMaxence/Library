import { api } from '../services/apiConfig';

export const login = async ({ username, password }) => {
    try {
        const response = await api.post('/api/auth/login', {
            username,
            password
        });

        return response.data;
    } catch (error) {
        throw new Error('Technical error during login');
    }
};

export const register = async ({ username, password }) => {
    try {
        const response = await api.post('/api/auth/register', {
            username,
            password
        });

        return response.data;
    } catch (error) {
        throw new Error('Technical error during registration');
    }
};

export const logout = async () => {
    try {
        const response = await api.post('/api/auth/logout', {});

        return response.data;
    } catch (error) {
        throw new Error('Technical error during logout');
    }
};

export const checkToken = async () => {
    try {
        const response = await api.get('/api/auth/verify-token', {});

        return response.data;
    } catch (error) {
        throw new Error('Technical error during logout');
    }
};