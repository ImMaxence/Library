import { isConnected } from "./isConnected";

export const getCurrentUser = async () => {
    try {
        await isConnected();
        const response = await fetch(`${process.env.REACT_APP_URL_BACK}/api/users/profile`, {
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