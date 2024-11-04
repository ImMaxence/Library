import React, { useState, useRef, useEffect } from 'react';
import { getAllBooks } from '../services/booksService';
import Layout from '../components/Layout';
import { Button, Input, InputNumber, Form } from 'antd'; // Ant Design components
import chevron_left from '../assets/icons/chevron_left.svg';
import chevron_right from '../assets/icons/chevron_right.svg';
import SlideCard from '../components/SlideCard';
import { getAllFutureBooks } from '../services/futureService';
import CardBook from '../components/CardBook';

const HomePage = () => {
    const [dataBooks, setDataBooks] = useState([]);
    const [dataFuture, setDataFuture] = useState([]);
    const [filters, setFilters] = useState({ title: '', author: '', minPrice: null, maxPrice: null });

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

    const fetchBooks = async (appliedFilters = {}) => {
        try {
            const res = await getAllBooks(appliedFilters);
            setDataBooks(res);
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        fetchBooks();

        const fetchFuture = async () => {
            try {
                const res = await getAllFutureBooks();
                setDataFuture(res);
            } catch (err) {
                console.log(err);
            }
        };

        fetchFuture();
    }, []);

    const onFinish = (values) => {
        const filtersToApply = Object.fromEntries(
            Object.entries({
                title: values.title || '',
                author: values.author || '',
                minPrice: values.minPrice ?? null,
                maxPrice: values.maxPrice ?? null,
            }).filter(([_, v]) => v !== null && v !== '')
        );

        setFilters(filtersToApply);
        fetchBooks(filtersToApply);
    };


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
                        <Form layout="inline" onFinish={onFinish}>
                            <Form.Item name="title" label="Titre">
                                <Input placeholder="Titre du livre" />
                            </Form.Item>
                            <Form.Item name="author" label="Auteur">
                                <Input placeholder="Auteur" />
                            </Form.Item>
                            <Form.Item name="minPrice" label="Prix Min">
                                <InputNumber placeholder="Min" min={0} />
                            </Form.Item>
                            <Form.Item name="maxPrice" label="Prix Max">
                                <InputNumber placeholder="Max" min={0} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Rechercher</Button>
                            </Form.Item>
                        </Form>
                    </div>

                    <div className="home_item">
                        {dataBooks.map((book) => (
                            <CardBook
                                key={book.id}
                                image={book.image}
                                title={book.title}
                                price={book.price}
                                author={book.author}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
