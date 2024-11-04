import { api } from '../services/apiConfig';

export const getAllBooks = async (filters = {}) => {
    try {
        const queryString = new URLSearchParams(filters).toString(); // Convertit les filtres en chaîne de requête
        const response = await api.get(`/api/books/get-all?${queryString}`);
        return response.data;
    } catch (error) {
        throw new Error('Technical error during book retrieval');
    }
};


export const addBook = async ({ title, author, price, image }) => {
    try {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('author', author)
        formData.append('price', price)
        formData.append('image', image)

        const response = await api.post(`/api/books/create-book`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Technical error during book addition');
    }
};

export const updateBook = async ({ id, title, author, price, image }) => {
    try {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('author', author)
        formData.append('price', price)
        formData.append('image', image)

        const response = await api.put(`/api/books/update-book/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (err) {
        throw new Error('Technical error during update book')
    }
}

export const deleteBook = async ({ id }) => {
    try {
        const response = await api.delete(`/api/books/delete-book/${id}`, {})
        return response.data
    } catch (err) {
        throw new Error('Technical error during delete book')
    }
}