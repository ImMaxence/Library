import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { getCurrentUser } from '../services/userService';
// import { motion } from 'framer-motion'
// import { boxVariants } from '../utils/framerMotion'

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login({ username, password });
            navigate('/home');
            //  Petite information, dans la console du navigateur, quand on se connecte
            //  Ca fait d'abord un call api pour le /login, mais vu qu'on accede à une 
            //  route protected (voir app.js) ca va aussi verifier la validé du token
            //  d'où la doule request
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
