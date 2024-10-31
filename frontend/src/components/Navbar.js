import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Badge, Avatar } from 'antd'
import logo from '../assets/icons/logo.png'
import { getFirstLetter } from '../utils/firstLetter'
import { getCurrentUser } from '../services/userService'
// import { checkToken } from '../services/authService';

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

    const handleNavigate = async (route) => {

        navigate(route)

        // try {
        //     await checkToken();
        //     console.log("[VERIFY TOKEN NAVBAR] : ✅ Token valide, accès...");
        //     navigate(route)
        // } catch (error) {
        //     console.log("[VERIFY TOKEN NAVBAR] : ❌ Erreur, rediction en cours...");
        // }
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
                    <Button type='text' onClick={() => handleNavigate('/create-book')}>Ajouter un livre</Button>
                </div>
                <div className="nav_profile">
                    <Badge dot>
                        {data ? (
                            <Avatar shape='square' size='large' className='avatar' onClick={() => handleNavigate('/profile')}>
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