import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { checkToken } from '../services/authService';
import Navbar from './Navbar';
import Footer from './Footer';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [role, setRole] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true);
        const verifyToken = async () => {
            try {
                const response = await checkToken();
                console.log("[VERIFY TOKEN PROTECTED ROUTE] : ✅ Token valide, accès...");
                setRole(response.role);
                setIsAuthenticated(response.isAuthenticated);
                if (location.pathname === '/back-office' && response.role !== 2) {
                    navigate('/')
                }
            } catch (error) {
                console.log("[VERIFY TOKEN PROTECTED ROUTE] : ❌ Erreur, redirection en cours...");
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        setTimeout(() => { verifyToken(); }, 2000);
    }, [location]);

    return (
        <>
            <Navbar role={role} />
            {loading ? (
                <div className="protect_spin">
                    <Spin size='large' />
                </div>
            ) : isAuthenticated ? (
                <>
                    <Outlet />
                    <Footer />
                </>
            ) : (
                <Navigate to="/" />
            )}
        </>
    );
};

export default ProtectedRoute;