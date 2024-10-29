import { api } from '../services/apiConfig';

export const getAllBooks = async () => {
    try {
        const response = await api.get('/api/books');
        return response.data;
    } catch (error) {
        throw new Error('Technical error during book retrieval');
    }
};

export const addBook = async ({ data }) => {
    try {
        const response = await api.post('/api/books', {
            data
        });
        return response.data;
    } catch (error) {
        throw new Error('Technical error during book addition');
    }
};
