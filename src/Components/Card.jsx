import { useState } from 'react';

const Card = (props) => {
    const [readmore, setReadmore] = useState(false);
    const tour = props.tour;

    let description = readmore ? tour.info : `${tour.info.substring(0, 200)}....`;

    return (
        <div className="card">
            <img className='cityImage' src={tour.image} alt="cityImage" />
            <div className="tourInfo">
                <div className="tourDetails">
                    <h4 className="tourPrice">{tour.price}</h4>
                    <h4 className="tourCityName">
                        {tour.emoji} {tour.name} 
                        <span style={{ fontSize: '0.8rem', color: '#888' }}> ({tour.region})</span>
                    </h4>
                </div>

                <div className="description">
                    {description}
                    <span 
                        className='readMore' 
                        onClick={() => setReadmore(!readmore)}
                    >
                        {readmore ? " Show Less" : " Read More"}
                    </span>
                </div>

                {/* Theme tags */}
                <div className="themeTags">
                    {tour.themes && tour.themes.map((theme, index) => (
                        <span className="tag" key={index}>{theme}</span>
                    ))}
                </div>
            </div>

            {/* Final resolved version: both buttons inside cardActions */}
            <div className='cardActions'>
                <button 
                    className='intrestedBtn' 
                    onClick={() => props.addToInterested && props.addToInterested(tour)}
                > 
                    Interested
                </button>

                <button 
                    className='notIntrestedBtn' 
                    onClick={() => props.getRemoveId(tour.id)}
                >
                    Not Interested
                </button>
            </div>
        </div>
    );
};

export default Card;

