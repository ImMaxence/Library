import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { checkToken } from '../services/authService';
import Navbar from './Navbar';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await checkToken();
                console.log("[VERIFY TOKEN PROTECTED ROUTE] : ✅ Token valide, accès...");
                setIsAuthenticated(response.isAuthenticated);
            } catch (error) {
                console.log("[VERIFY TOKEN PROTECTED ROUTE] : ❌ Erreur, rediction en cours...");
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [location]);

    if (loading) return <p>Loading...</p>;

    return isAuthenticated ? (
        <>
            <Navbar />
            <Outlet />
        </>
    ) : (
        <Navigate to="/" />
    );
};

export default ProtectedRoute;
