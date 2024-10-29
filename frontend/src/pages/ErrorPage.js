import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {

    const navigate = useNavigate()

    return (
        <div>
            <h1>Error occur</h1>
            <button onClick={() => navigate('/')}>Page home</button>
        </div>
    );
};

export default ErrorPage;