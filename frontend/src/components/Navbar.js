import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Badge, Avatar } from 'antd'
import logo from '../assets/icons/logo.png'
import { getFirstLetter } from '../utils/firstLetter'
import { getCurrentUser } from '../services/userService'

const Navbar = () => {

    const navigate = useNavigate()
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = await getCurrentUser();
                setData(currentUser);
                console.log(currentUser);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <nav>
            <div className="nav_logo">
                <img src={logo} alt="logo" />
                <h3>VilleBlanche</h3>
            </div>

            <div className="nav_right">
                <div className="nav_btn">
                    <Button type='text' onClick={() => navigate('/home')}>Accueil</Button>
                    <Button type='text' onClick={() => navigate('/create-book')}>Ajouter un livre</Button>
                </div>
                <div className="nav_profile">
                    <Badge dot>
                        {data ? (
                            <Avatar shape='square' size='large' className='avatar' onClick={() => navigate('/profile')}>
                                {getFirstLetter(data.username)}
                            </Avatar>
                        ) : (
                            <Avatar shape='square' size='large' className='avatar'>
                                Unknow
                            </Avatar>
                        )}
                    </Badge>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;