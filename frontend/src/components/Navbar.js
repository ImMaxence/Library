import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Badge, Avatar, Spin } from 'antd'
import logo from '../assets/icons/logo.png'
import { getFirstLetter } from '../utils/firstLetter'
import { getCurrentUser } from '../services/userService'

const Navbar = ({ role }) => {

    console.log(role)

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

        setTimeout(() => { fetchData(); }, 2000)
    }, []);

    const handleNavigate = async (route) => {
        navigate(route)
    }

    return (
        <nav>
            <div className="nav_logo">
                <img src={logo} alt="logo" />
                <h3>VilleBlanche</h3>
            </div>

            <div className="nav_right">
                <div className="nav_btn">
                    <Button type='text' onClick={() => handleNavigate('/home')}>Accueil</Button>
                    {role === 2 ? <Button type='text' onClick={() => handleNavigate('/back-office')}>Back Office</Button> : null}
                </div>
                <div className="nav_profile">

                    {data ? (
                        <Badge dot>
                            <Avatar shape='square' size='large' className='avatar' onClick={() => handleNavigate('/profile')}>
                                {getFirstLetter(data.username)}
                            </Avatar>
                        </Badge>
                    ) : (
                        <Spin size='small' />
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;