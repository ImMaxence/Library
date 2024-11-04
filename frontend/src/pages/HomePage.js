import { React, useState, useRef, useEffect } from 'react';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { getAllBooks } from '../services/booksService'
import Layout from '../components/Layout';
import { Button } from 'antd'
import chevron_left from '../assets/icons/chevron_left.svg'
import chevron_right from '../assets/icons/chevron_right.svg'
import SlideCard from '../components/SlideCard';
import { getAllFutureBooks } from '../services/futureService'

const HomePage = () => {

    const [error, setError] = useState(null);
    const [dataBooks, setDataBooks] = useState([]);
    const [dataFuture, setDataFuture] = useState([]);

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
        const fetchBooks = async () => {
            try {
                const res = await getAllBooks();
                setDataBooks(res)
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        };

        const fetchFuture = async () => {
            try {
                const res = await getAllFutureBooks()
                setDataFuture(res)
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }

        fetchBooks();
        fetchFuture()
    }, [])

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
                    {dataFuture.map((slide) => (
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