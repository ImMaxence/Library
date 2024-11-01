import { api } from '../services/apiConfig';

export const getAllBooks = async () => {
    try {
        const response = await api.get('/api/books/get-all');
        return response.data;
    } catch (error) {
        throw new Error('Technical error during book retrieval');
    }
};

export const addBook = async ({ title, author, price }) => {
    try {
        const response = await api.post('/api/books/create-book', {
            title,
            author,
            price
        });
        return response.data;
    } catch (error) {
        throw new Error('Technical error during book addition');
    }
};

export const updateBook = async ({ id, title, author, price }) => {
    try {
        const response = await api.put(`/api/books/update-book/${id}`, {
            title,
            author,
            price
        })
        return response.data
    } catch (err) {
        throw new Error('Technical error during update book')
    }
}

export const deleteBook = async ({ id }) => {
    try {
        const response = await api.delete(`/api/books/delete_book/${id}`, {})
        return response.data
    } catch (err) {
        throw new Error('Technical error during delete book')
    }
}