import { api } from '../services/apiConfig';

export const getAllFutureBooks = async () => {
    try {
        const response = await api.get('/api/future/get-all', {})
        return response.data
    } catch (err) {
        throw new Error('Technical error during get future books')
    }
}

export const createFutureBook = async ({ title, author, date }) => {
    try {
        const response = await api.post('/api/future/create-book', {
            title,
            author,
            date
        })
        return response.data
    } catch (err) {
        throw new Error('Technical error during create future book')
    }
}

export const updateFutureBook = async ({ id, title, author, date }) => {
    try {
        const response = await api.put(`/api/future/update-book/${id}`, {
            title,
            author,
            date
        })
        return response.data
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