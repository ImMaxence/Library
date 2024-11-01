import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/userService'
import { logout } from '../services/authService';
import Layout from '../components/Layout';
import { Button, Skeleton } from "antd"

const UserProfile = () => {

    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCurrentUser()
                setData(response)
                setLoading(false)
            } catch (err) {
                setError(err)
                setLoading(false)
            } finally {
                setLoading(false);
            }
        };

        setTimeout(() => { fetchData(); }, 2000);
    }, [])

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
            <h1>Votre profil</h1>
            {error && <p className='error'>{error}</p>}
            {loading ? (
                <Skeleton active />
            ) : (
                <ul>
                    <li>id : {data.id}</li>
                    <li>usernmae : {data.username}</li>
                </ul>
            )}
            <Button type='primary' onClick={handleSubmit}>Se déconecter</Button>
        </Layout>
    );
};

export default UserProfile;