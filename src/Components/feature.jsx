import React from 'react';
import { Link } from 'react-router-dom';
import './feature.css'; // Import the CSS for styling

const Features = () => {
    return (
        <div className="container">
            <section id="features-page">
                <h2>Our Awesome Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3><i className="fas fa-map-marked-alt"></i> Interactive Itinerary</h3>
                        <p>Drag and drop activities to build your perfect day-by-day schedule.</p>
                    </div>
                    <div className="feature-card">
                        <h3><i className="fas fa-users"></i> Real-time Collaboration</h3>
                        <p>Plan trips with friends and family, and see their changes instantly.</p>
                    </div>
                    <div className="feature-card">
                        <h3><i className="fas fa-wallet"></i> Budget Tracking</h3>
                        <p>Keep your spending in check with our easy-to-use budget management tool.</p>
                    </div>
                </div>
                
                <br />
                <Link to="/" className="button">Back to Home</Link>
            </section>
        </div>
    );
};

export default Features;
