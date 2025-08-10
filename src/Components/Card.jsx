import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = (props) => {
    const navigate = useNavigate();
    const tour = props.tour;

    const handleCardClick = () => {
        navigate(`/tour/${tour.id}`, { state: { tour } });
    };

    return (
        <div 
            className="tour-card" 
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
        >
            <div className="image-wrapper">
                <img className='cityImage' src={tour.image} alt="cityImage" />
                <div className="price-tag">{tour.price}</div>
            </div>

            <div className="tourInfo">
                <h4 className="tourCityName">
                    {tour.emoji} {tour.name} 
                    <span className="region">({tour.region})</span>
                </h4>
            </div>

            <div className='cardActions' onClick={(e) => e.stopPropagation()}>
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