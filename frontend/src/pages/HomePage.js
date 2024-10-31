import { React, useState, useRef, useEffect } from 'react';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { getAllBooks } from '../services/booksService'
import Layout from '../components/Layout';
import { Button } from 'antd'
import chevron_left from '../assets/icons/chevron_left.svg'
import chevron_right from '../assets/icons/chevron_right.svg'
import SlideCard from '../components/SlideCard';
import img1 from '../assets/images/slider/img1.png'
import img2 from '../assets/images/slider/img2.png'
import img3 from '../assets/images/slider/img3.png'
import img4 from '../assets/images/slider/img4.png'
import img5 from '../assets/images/slider/img5.png'
import img6 from '../assets/images/slider/img6.png'

const HomePage = () => {

    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const navigate = useNavigate()

    const sliderRef = useRef(null);
    const scrollAmount = 300;

    const handleNext = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const handlePrevious = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllBooks();
                setData(res)
                console.log(res)
            } catch (err) {
                setError(err)
                console.log(err)
            }
        };

        fetchData();
    }, [])

    const slides = [
        {
            id: 1,
            image: img1,
            title: '1984',
            author: 'George Orwell',
            date: '01/01/2024',
        },
        {
            id: 2,
            image: img2,
            title: 'Orgueil et préjugés',
            author: 'Jane Austen',
            date: '02/02/2024',
        },
        {
            id: 3,
            image: img3,
            title: 'Hamlet',
            author: 'William Shakespeare',
            date: '03/03/2024',
        },
        {
            id: 4,
            image: img4,
            title: 'Les Mille et Une Nuits',
            author: 'Anonyme',
            date: '04/04/2024',
        },
        {
            id: 5,
            image: img5,
            title: 'Crime et châtiment',
            author: 'Fiodor Dostoïevski',
            date: '05/05/2024',
        },
        {
            id: 6,
            image: img6,
            title: 'Don Quichotte',
            author: 'Miguel De Cervantes',
            date: '06/06/2024',
        },
    ];

    return (
        <Layout>
            <header>
                <div className='home_slider_title'>
                    <h3>Liste des prochaines arrivées</h3>
                    <div className="grouped_chevron">
                        <Button onClick={handlePrevious}>
                            <img src={chevron_left} alt="left" />
                        </Button>
                        <Button onClick={handleNext}>
                            <img src={chevron_right} alt="right" />
                        </Button>
                    </div>
                </div>

                <div className="home_container_slider" ref={sliderRef}>
                    {slides.map((slide) => (
                        <SlideCard
                            key={slide.id}
                            image={slide.image}
                            title={slide.title}
                            author={slide.author}
                            date={slide.date}
                        />
                    ))}
                </div>
            </header>
            <div>
                <h2>Chercher un livre</h2>
                <div className="home_search_parent_container">
                    <div className="home_search">

                    </div>

                    <div className="home_item">

                    </div>
                </div>
            </div>
        </Layout>

    );
};

export default HomePage;