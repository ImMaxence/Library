import { api } from '../services/apiConfig';

export const getAllFutureBooks = async () => {
    try {
        const response = await api.get('/api/future/get-all', {})
        return response.data
    } catch (err) {
        throw new Error('Technical error during get future books')
    }
}

export const createFutureBook = async ({ title, author, date, image }) => {
    try {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('author', author)
        formData.append('date', date)
        formData.append('image', image)

        const response = await api.post(`/api/future/create-book`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (err) {
        throw new Error('Technical error during create future book')
    }
}

export const updateFutureBook = async ({ id, title, author, date, image }) => {
    try {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('author', author)
        formData.append('date', date)
        formData.append('image', image)

        const response = await api.put(`/api/future/update-book/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (err) {
        throw new Error('Technical error during update future book')
    }
}

export const deleteFutureBook = async ({ id }) => {
    try {
        const response = await api.delete(`/api/future/delete-book/${id}`, {})
        return response.data
    } catch (err) {
        throw new Error('Technical error during delete book')
    }
}