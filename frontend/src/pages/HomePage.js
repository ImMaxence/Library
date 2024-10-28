import { React, useState } from 'react';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ updateAuthStatus }) => {

    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await logout();
            await updateAuthStatus();
            navigate('/')
        } catch (err) {
            setError('Error log out');
            console.log(err);
        }
    };

    return (
        <div>
            <h1>homepage</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleSubmit}>log out</button>
        </div>
    );
};

export default HomePage;