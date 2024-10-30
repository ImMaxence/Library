import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/userService'

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

    return (
        <div>
            <h1>user profile page</h1>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
            <button onClick={handleGetCurrentUser}>fetch current user info</button>
            {/* {data && <p>{data}</p>} */}
            <button onClick={() => navigate('/')}>back</button>
        </div>
    );
};

export default UserProfile;