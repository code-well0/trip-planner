import React, { useState } from 'react';
import './Card.css';

const Card = (props) => {
    const [readmore, setReadmore] = useState(false);
    const tour = props.tour;

    let description = readmore
        ? tour.info
        : `${tour.info.substring(0, 200)}....`;

    return (
        <div className="tour-card">
            <div className="image-wrapper">
                <img className='cityImage' src={tour.image} alt="cityImage" />
                <div className="price-tag">{tour.price}</div>
            </div>

            <div className="tourInfo">
                <h4 className="tourCityName">
                    {tour.emoji} {tour.name} 
                    <span className="region">({tour.region})</span>
                </h4>

                <div className="description">
                    {description}
                    <span
                        className='readMore'
                        onClick={() => setReadmore(!readmore)}
                    >
                        {readmore ? " Show Less" : " Read More"}
                    </span>
                </div>
            </div>

            <div className='cardActions'>
                <button
                    className='interestedBtn'
                    onClick={() => props.addToInterested && props.addToInterested(tour)}
                >
                    ❤️ Interested
                </button>

                <button
                    className='notInterestedBtn'
                    onClick={() => props.getRemoveId(tour.id)}
                >
                    ❌ Not Interested
                </button>
            </div>
        </div>
    );
};

export default Card;