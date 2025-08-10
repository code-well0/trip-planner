import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Card.css';

const Card = (props) => {
  const { theme } = useTheme();
  const [readmore, setReadmore] = useState(false);
  const tour = props.tour;

  let description = readmore
    ? tour.info
    : `${tour.info.substring(0, 200)}....`;

  return (
    <div className={`tour-card ${theme === 'dark' ? 'dark-theme-card' : ''}`}>
      <div className="image-wrapper">
        <img className='cityImage' src={tour.image} alt="cityImage" />
        <div className="price-tag">{tour.price}</div>
      </div>

      <div className="tourInfo">
        <h4 className={`tourCityName ${theme === 'dark' ? 'dark-text' : ''}`}>
          {tour.emoji} {tour.name}
          <span className={`region ${theme === 'dark' ? 'dark-text-secondary' : ''}`}>({tour.region})</span>
        </h4>

        <div className="description">
          <p className={theme === 'dark' ? 'dark-text-secondary' : ''}>
            {description}
            <span
              className={`readMore ${theme === 'dark' ? 'dark-link-text' : ''}`}
              onClick={() => setReadmore(!readmore)}
            >
              {readmore ? " Show Less" : " Read More"}
            </span>
          </p>
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
