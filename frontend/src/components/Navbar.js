import React from 'react';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

    return (
        <nav>
            <h1>Navbar</h1>
            <button onClick={() => navigate('/home')}>Home</button>
            <button onClick={() => navigate('/profile')}>Profile</button>
        </nav>
    );
};

export default Navbar;