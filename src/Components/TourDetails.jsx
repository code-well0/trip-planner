import React from 'react';
import { useLocation } from 'react-router-dom';
// import './TourDetails.css';

const TourDetails = () => {
    const location = useLocation();
    const tour = location.state?.tour;

    if (!tour) {
        return <h2>Tour not found</h2>;
    }

    return (
        <div className="tour-details">
            <img src={tour.image} alt={tour.name} className="details-image" />
            <h2>{tour.emoji} {tour.name}</h2>
            <p><strong>Region:</strong> {tour.region}</p>
            <p><strong>Price:</strong> ₹{tour.price}</p>
            <p>{tour.longDescription || tour.info}</p>

            {tour.highlights && (
              <>
                <h3>Highlights</h3>
                <ul>
                  {tour.highlights.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </>
            )}

            {tour.gallery && (
              <>
                <h3>Gallery</h3>
                <div className="gallery">
                  {tour.gallery.map((img, idx) => (
                    <img key={idx} src={img} alt={`${tour.name} ${idx}`} />
                  ))}
                </div>
              </>
            )}
        </div>
    );
};

export default TourDetails;
