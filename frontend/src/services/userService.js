import { api } from '../services/apiConfig';

export const getCurrentUser = async () => {
    try {
        const response = await api.get('/api/users/profile');
        return response.data;
    } catch (error) {
        throw new Error('Technical error during current user retrieval');
    }
};
