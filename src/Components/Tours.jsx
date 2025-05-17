import React from 'react';
import Card from './Card.jsx';

const Tours = (props) => {
    const regions = ["All", "North", "South", "East", "West"];

    function getId(id) {
        props.removeTour(id);
    }

    return (
        <div className='container'>
            <div>
                <h2 className="title">Your Trip Planner</h2>
            </div>

            {/* 🌍 Region filter buttons */}
            <div className="regionFilters">
                {regions.map((region) => (
                    <button
                        key={region}
                        className={`regionBtn ${props.selectedRegion === region ? "active" : ""}`}
                        onClick={() => props.setSelectedRegion(region)}
                    >
                        {region}
                    </button>
                ))}
            </div>

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
