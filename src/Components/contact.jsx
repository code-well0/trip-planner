import React from "react";
import './contact.css';
import { useTheme } from '../contexts/ThemeContext';

export default function Contact() {
    const { theme } = useTheme();
    
    return (
        <div className={`contact-container ${theme}`}>
            <div className={`contact ${theme}`}>
                <div className="contact-header-container">
                    <h1 className="contact-header">
                        <span className="contact-icon">📩</span> Contact Your Trip Planner
                    </h1>
                    <div className="header-divider"></div>
                </div>
                
                <h3 className="intro-text">
                    Whether you have a question, feedback, or just want to share your travel story, 
                    our team is here to help. Reach out to us through any of the channels below, 
                    and we'll get back to you as soon as possible!
                </h3>
                
                <p className="priority-text">
                    "Your satisfaction is our top priority. If you encounter any issues while using our platform 
                    or have questions about our services, our dedicated support team is ready to assist you. 
                    We pride ourselves on prompt, helpful responses to ensure your travel planning experience 
                    remains smooth and enjoyable."
                </p>

                <div className="contact-form-container">
                    <div className="info">
                        <div className="input-group">
                            <label>Name</label>
                            <input type="text" placeholder="Enter your name" />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input type="email" placeholder="Enter your email" />
                        </div>
                        <div className="input-group">
                            <label>Message</label>
                            <textarea placeholder="Enter your message"></textarea>
                        </div>
                        <button className="submit-btn">
                            <span className="btn-text">Submit</span>
                            <span className="btn-icon">→</span>
                        </button>
                    </div>
                </div>
                
                <p className="tags">
                    <span className="tag-icon">🧳</span> "From Itineraries to Memories – We've Got You Covered."
                </p>
                
                <div className="social-section">
                    <h3 className="touch">Get in touch</h3>
                    <div className="social-links">
                        <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                        <a href="https://www.linkedin.com/in/shubrali-jain" className="social-icon"><i className="fab fa-linkedin"></i></a>
                        <a href="https://github.com/code-well0" className="social-icon"><i className="fab fa-github"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}