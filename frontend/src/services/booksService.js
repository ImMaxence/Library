import { isConnected } from "./isConnected";

export const getAllBooks = async () => {
    try {
        await isConnected();
        const response = await fetch(`${process.env.REACT_APP_URL_BACK}/api/books`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Error retrieving books');
        }

        return await response.json();
    } catch (error) {
        console.error('Technical error front:', error);
        throw error;
    }
};

export const addBook = async (data) => {
    try {
        await isConnected();
        const response = await fetch(`${process.env.REACT_APP_URL_BACK}/api/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Error retrieving books');
        }

        return await response.json();
    } catch (error) {
        console.error('Technical error front:', error);
        throw error;
    }
};