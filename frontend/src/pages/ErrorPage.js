import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const ErrorPage = () => {

    const navigate = useNavigate()

    return (
        <Layout>
            <h1>Error occur</h1>
            <button onClick={() => navigate('/')}>Page home</button>
        </Layout>
    );
};

export default ErrorPage;