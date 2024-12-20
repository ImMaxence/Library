import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/authService';
import { Button, Input } from 'antd';
import logo from '../assets/icons/logo.png';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameRe, setUsernameRe] = useState('');
    const [passwordRe, setPasswordRe] = useState('');
    const [confirmPasswordRe, setConfirmPasswordRe] = useState('');
    const [error, setError] = useState(null);
    const [errorRe, setErrorRe] = useState(null);
    const [show, setShow] = useState(true)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loadingRe, setLoadingRe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        setTimeout(async () => {
            if (username.length <= 0 || password.length <= 0) {
                setError('Veuillez rentrer un nom et mot de passe');
                setLoading(false);
            } else {
                try {
                    await login({ username, password });
                    setError(null);
                    navigate('/home');
                    setLoading(false);
                } catch (err) {
                    setError('Nom ou mot de passe incorrect');
                    console.log(err);
                    setLoading(false);
                }
            }
        }, 2000)
    };

    const handleSubmitRe = async (e) => {
        e.preventDefault();

        setLoadingRe(true);

        setTimeout(async () => {
            if (usernameRe.length <= 0 || passwordRe.length <= 0 || confirmPasswordRe.length <= 0) {
                setErrorRe('Veuillez rentrer un nom et mot de passe');
                setLoadingRe(false);
            } else if (passwordRe !== confirmPasswordRe) {
                setErrorRe('Les deux mots de passe ne correspondent pas');
                setLoadingRe(false);
            } else {
                try {
                    await register({ username: usernameRe, password: passwordRe });
                    setErrorRe('Création avec succès');
                    setLoadingRe(false);
                } catch (err) {
                    setErrorRe('Erreur technique lors de la création du compte');
                    console.log(err);
                    setLoadingRe(false);
                }
            }
        }, 2000)
    };

    return (
        <div className='login_container'>
            <div className="login_img">
                <div className="login_part1">
                    <img src={logo} alt="logo" />
                    <h3>Bibliothèque de VilleBlanche</h3>
                </div>
            </div>

            <div className={`login_wrapper ${!show ? 'hidden' : ''}`}>
                <div className="login_part2">
                    <div>
                        <h1>Page d'authentification</h1>
                        {error && <p className='error'>{error}</p>}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='item'>
                            <h4>Nom</h4>
                            <Input onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className='item'>
                            <h4>Mot de passe</h4>
                            <Input.Password onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="item button">
                            <Button type="primary" loading={loading} htmlType="submit">Se connecter</Button>
                            <Button onClick={() => setShow(false)}>S'enregistrer</Button>
                        </div>
                    </form>
                </div>
            </div>

            <div className={`login_wrapper ${!show ? '' : 'hidden'}`}>
                <div className="login_part2">
                    <div>
                        <h1>Page de création de compte</h1>
                        {errorRe && <p className='error'>{errorRe}</p>}
                    </div>
                    <form onSubmit={handleSubmitRe}>
                        <div className='item'>
                            <h4>Nom</h4>
                            <Input onChange={(e) => setUsernameRe(e.target.value)} />
                        </div>
                        <div className='item'>
                            <h4>Mot de passe</h4>
                            <Input.Password onChange={(e) => setPasswordRe(e.target.value)} />
                        </div>
                        <div className='item'>
                            <h4>Confirmer votre mot de passe</h4>
                            <Input.Password onChange={(e) => setConfirmPasswordRe(e.target.value)} />
                        </div>
                        <div className="item button">
                            <Button type="primary" loading={loadingRe} htmlType="submit">Créer</Button>
                            <Button onClick={() => setShow(true)}>Se connecter</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
