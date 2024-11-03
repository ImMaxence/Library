import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getCurrentUser } from '../services/userService';
import { Spin } from 'antd';

const ErrorPage = () => {

    const navigate = useNavigate()

    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = await getCurrentUser();
                setData(currentUser);
                console.log(currentUser)
            } catch (err) {
                console.error(err);
            }
        };

        setTimeout(() => { fetchData(); }, 2000)
    }, []);

    return (
        <Layout>
            <h1>Error occur</h1>
            <button onClick={() => navigate('/')}>Page home</button>
            {data && (
                <>
                    <h1>data found</h1>
                    <ul>
                        <li>{data.id}</li>
                        <li>{data.username}</li>
                        <img src={data.image} alt="" />
                    </ul>
                </>
            )}
        </Layout>
    );
};

export default ErrorPage;