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
    const [role, setRole] = useState(null)

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
                setRole(response.role)
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
        try {
            await updateUser({
                id: data.id,
                username: username,
                password: password,
                role: role,
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
            setImage(fileURL); // local
        }
    };

    return (
        <Layout>
            <h1 style={{ marginBottom: 30 }}>Your Profile</h1>
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
                    <div className="up_content">
                        <p>Nouvelle photo de profil</p>
                        <input type='file' accept="image/*" onChange={handleFileChange} />
                        <p>Nouveau nom</p>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <p>Nouveau mot de passe</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div style={{ marginTop: 30, marginBottom: 30 }}>
                            <Button type='primary' onClick={handleUpdateUser}>Mettre à jour</Button>
                        </div>

                    </div>
                </>
            )}
            <Button type='primary' onClick={handleLogOut}>Se déconnecter</Button>
        </Layout>
    );
};

export default UserProfile;
