import { isConnected } from "./isConnected";

export const login = async ({ username, password }) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_BACK}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Error login');
        }

        return await response.json();
    } catch (error) {
        console.error('Technical error front:', error);
        throw error;
    }
};

export const register = async ({ username, password }) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_BACK}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error register: ${response.status} - ${errorMessage}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Technical error front:', error);
        throw error;
    }
};


export const logout = async () => {
    try {
        isConnected()
        const response = await fetch(`${process.env.REACT_APP_URL_BACK}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Error register');
        }

        return await response.json();
    } catch (error) {
        console.error('Technical error front:', error);
        throw error;
    }
};