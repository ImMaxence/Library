import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/userService'
import { logout } from '../services/authService';
import Layout from '../components/Layout';

const UserProfile = () => {

    const navigate = useNavigate()

    const [error, setError] = useState("")
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await logout();
            navigate('/')
        } catch (err) {
            setError('Error log out');
            console.log(err);
        }
    };

    return (
        <Layout>
            <h1>user profile page</h1>
            <button onClick={handleGetCurrentUser}>fetch current user info</button>
            <button onClick={() => navigate('/')}>back</button>
            <button onClick={handleSubmit}>log out</button>
        </Layout>
    );
};

export default UserProfile;