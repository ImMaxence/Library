import React from 'react';

const SlideCard = ({ image, title, author, date }) => {
    return (
        <div className="home_slider_next">
            <div className="slide_container_image">
                <img src={image} alt="slider img" />
            </div>
            <div className='slide_content'>
                <h4>{title}</h4>
                <h5>{author}</h5>
                <br />
                <p>le {date}</p>
            </div>
        </div>
    );
};

export default SlideCard;