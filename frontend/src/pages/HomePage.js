import { React, useState } from 'react';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { getAllBooks } from '../services/booksService'

const HomePage = ({ updateAuthStatus }) => {

    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
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

    const handleGetBooks = async () => {
        try {
            const res = await getAllBooks();
            setData(res)
            console.log(res)
        } catch (err) {
            setError(err)
            console.log(err)
        }
    }

    return (
        <div>
            <h1>homepage</h1>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
            <button onClick={handleSubmit}>log out</button>
            <button onClick={() => navigate('/profile')}>user profile</button>
            <button onClick={handleGetBooks}>fetch books</button>
        </div>
    );
};

export default HomePage;