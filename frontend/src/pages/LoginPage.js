import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { Button, Checkbox, Form, Input } from 'antd';

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

    return (
        <div className='login_container'>
            <h1>Login Page</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <Input onChange={(e) => setUsername(e.target.value)} />
                <Input.Password onChange={(e) => setPassword(e.target.value)} />
                <Button type="primary" htmlType="submit">Envoyer</Button>
                <Button type="primary" onClick={() => navigate('/register')}>S'enregistrer</Button>
            </form>
        </div>
    );
};

export default LoginPage;
