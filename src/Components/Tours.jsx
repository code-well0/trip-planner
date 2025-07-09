import React from 'react';
import Card from './Card.jsx';

const Tours = (props) => {
    const regions = ["All", "North", "South", "East", "West"];

    function getId(id) {
        props.removeTour(id);
    }

    return (
        <div className='container'>
        
            

            {/* 🧳 Tour cards */}
            <div className="cardsContainer">
                {props.tours.map((tour) => (
                    <Card key={tour.id} tour={tour} getRemoveId={getId} />
                ))}
            </div>
        </div>
    );
};

export default Tours;
