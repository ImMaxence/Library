import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { getCurrentUser } from '../services/userService';
// import { motion } from 'framer-motion'
// import { boxVariants } from '../utils/framerMotion'

const LoginPage = ({ updateAuthStatus }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login({ username, password });
            await updateAuthStatus();
            navigate('/');
        } catch (err) {
            setError('Invalid username or password');
            console.log(err);
        }
    };

    const [data, setData] = useState([])

    const handleGetCurrentUser = async () => {
        try {
            const currentUser = await getCurrentUser();
            setData(currentUser)
            console.log(currentUser)
        } catch (err) {
            setError(err)
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Login Page</h1>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Send</button>
            </form>
            <button onClick={() => navigate('/register')}>S'enregistrer</button>


            <div className="test">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
            </div>

            <button onClick={handleGetCurrentUser}>fetch current user info (only if token is present in coockie)</button>
        </div>
    );
};

export default LoginPage;
