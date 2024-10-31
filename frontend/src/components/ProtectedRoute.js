import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { checkToken } from '../services/authService';
import Navbar from './Navbar';
import Footer from './Footer';
import { Spin } from 'antd';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const verifyToken = async () => {
            try {
                // Simulate loading delay
                await new Promise(resolve => setTimeout(resolve, 2000));

                const response = await checkToken();
                console.log("[VERIFY TOKEN PROTECTED ROUTE] : ✅ Token valide, accès...");
                setIsAuthenticated(response.isAuthenticated);
            } catch (error) {
                console.log("[VERIFY TOKEN PROTECTED ROUTE] : ❌ Erreur, redirection en cours...");
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [location]);

    return (
        <>
            <Navbar />
            {loading ? (
                <div className="protect_spin">
                    <Spin size='large' />
                </div>
            ) : isAuthenticated ? (
                <Outlet />
            ) : (
                <Navigate to="/" />
            )}
            <Footer />
        </>
    );
};

export default ProtectedRoute;
