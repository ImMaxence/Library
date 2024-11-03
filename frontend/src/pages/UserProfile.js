import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateUser } from '../services/userService';
import { logout } from '../services/authService';
import Layout from '../components/Layout';
import { Button, Skeleton, Avatar } from "antd";
import { getFirstLetter } from '../utils/firstLetter';

const UserProfile = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCurrentUser();
                console.log(response);
                setData(response);
                setUsername(response.username);
                setOldPassword(response.password);
                setPassword(response.password);
                setImage(response.image);
                setLoading(false);
            } catch (err) {
                setError('Failed to load user data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            await logout();
            navigate('/');
        } catch (err) {
            setError('Error logging out');
            console.log(err);
        }
    };

    const handleUpdateUser = async () => {
        const passwordChanged = password && password !== oldPassword;
        setError('');
        console.log(file);
        try {
            await updateUser({
                id: data.id,
                username: username,
                password: password,
                passwordChanged: passwordChanged,
                image: file,
            });
            setError('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update profile');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            const fileURL = URL.createObjectURL(file);
            setImage(fileURL); // URL de l'image local
        }
    };

    return (
        <Layout>
            <h1>Your Profile</h1>
            {error && <p className='error'>{error}</p>}
            {loading ? (
                <Skeleton active />
            ) : (
                <>
                    {image ? (
                        <img src={image} alt="Profile" style={{ width: 150 }} />
                    ) : (
                        <Avatar shape='square' size={150} className='avatar'>
                            {getFirstLetter(username)}
                        </Avatar>
                    )}
                    <p>Change Profile Picture</p>
                    <input type='file' accept="image/*" onChange={handleFileChange} />
                    <p>Your Name</p>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <p>Your Password</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type='primary' onClick={handleUpdateUser}>Update</Button>
                </>
            )}
            <Button type='primary' onClick={handleLogOut}>Log Out</Button>
        </Layout>
    );
};

export default UserProfile;
