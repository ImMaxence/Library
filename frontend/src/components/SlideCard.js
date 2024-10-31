import React from 'react';

const SlideCard = ({ image, title, date }) => {
    return (
        <div className="home_slider_next">
            {image}
            {title}
            {date}
        </div>
    );
};

export default SlideCard;