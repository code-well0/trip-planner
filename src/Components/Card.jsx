
import React, { useState } from 'react';

const Card = ({ tour, getRemoveId }) => {
    const [readMore, setReadMore] = useState(false);
    const description = readMore ? tour.info : `${tour.info.substring(0, 200)}....`;

    return (
        <section className="card" aria-label={`Tour card for ${tour.name}`}>
            <img
                className="cityImage"
                src={tour.image}
                alt={tour.name ? `${tour.name} city` : "City image"}
                loading="lazy"
            />
            <div className="tourInfo">
                <div className="tourDetails">
                    <h4 className="tourPrice" aria-label="Tour price">{tour.price}</h4>
                    <h4 className="tourCityName">
                        <span role="img" aria-label={tour.name}>{tour.emoji}</span> {tour.name}
                        <span style={{ fontSize: '0.8rem', color: '#888' }}> ({tour.region})</span>
                    </h4>
                </div>
                <div className="description">
                    {description}
                    <button
                        className="readMore"
                        type="button"
                        aria-expanded={readMore}
                        onClick={() => setReadMore(!readMore)}
                        style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', padding: 0 }}
                    >
                        {readMore ? " Show Less" : " Read More"}
                    </button>
                </div>
            </div>
            <button
                className="notIntrestedBtn"
                type="button"
                onClick={() => getRemoveId(tour.id)}
                aria-label={`Remove ${tour.name} from list`}
            >
                Not Interested
            </button>
        </section>
    );
};

export default Card;

