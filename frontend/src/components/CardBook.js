import React from 'react';

const CardBook = ({ title, author, price, image }) => {
    return (
        <div className='cardbook_container'>
            <div className="cb_image">
                <img src={image} alt="img book" />
            </div>
            <div className="cb_content">
                <ul>
                    <li><h3>{title}</h3></li>
                    <li>{author}</li>
                    <li id='price'>{price} $</li>
                </ul>
            </div>
        </div>
    );
};

export default CardBook;