import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaGithub, FaEnvelope, FaInstagram, FaLinkedinIn, FaPaperPlane } from "react-icons/fa";

const Footer = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    const { theme } = useTheme();

    // 🔐 Intercept protected link clicks if not logged in
    const handleProtectedClick = (e, path) => {
        if (!isLoggedIn) {
            e.preventDefault();
            navigate('/login');
        }
    };

    return (
        <footer className="w-full bg-gray-200 text-gray-700 py-10 dark:bg-gray-800 dark:text-white transition-colors duration-300" role="contentinfo" aria-label="Footer">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 border-b border-gray-300 dark:border-gray-700 pb-8">

                    {/* Brand Section */}
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-2xl font-bold text-blue-600">YourTripPlanner</h3>
                        <p className="text-sm">Your ultimate companion for exploring the incredible destinations of India. Plan smarter, travel better.</p>
                        <div className="flex space-x-4 text-xl">
                            <a href="mailto:shubralijain@gmail.com" className="social-link hover:text-blue-500 transition-colors duration-200" aria-label="Email"><FaEnvelope /></a>
                            <a href="https://github.com/code-well0" className="social-link hover:text-blue-500 transition-colors duration-200" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                            <a href="https://www.instagram.com/_shubrali/" className="social-link hover:text-blue-500 transition-colors duration-200" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                            <a href="https://www.linkedin.com/in/shubrali-jain/" className="social-link hover:text-blue-500 transition-colors duration-200" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/plan" onClick={(e) => handleProtectedClick(e, '/plan')} className="hover:text-blue-500 transition-colors duration-200">Destinations</Link></li>
                            <li><Link to="/api/chat" onClick={(e) => handleProtectedClick(e, '/api/chat')} className="hover:text-blue-500 transition-colors duration-200">AI Assistant</Link></li>
                            <li><Link to="/expenses" onClick={(e) => handleProtectedClick(e, '/expenses')} className="hover:text-blue-500 transition-colors duration-200">Expense Tracker</Link></li>
                            <li><Link to="/TripRecommender" onClick={(e) => handleProtectedClick(e, '/TripRecommender')} className="hover:text-blue-500 transition-colors duration-200">Trip Recommender</Link></li>
                            <li><Link to="/CustomItinerary" onClick={(e) => handleProtectedClick(e, '/CustomItinerary')} className="hover:text-blue-500 transition-colors duration-200">AI Powered Custom Itinerary</Link></li>
                            <li><Link to="/about" className="hover:text-blue-500 transition-colors duration-200">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Popular Destinations */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">Popular Destinations</h4>
                        <ul className="space-y-2">
                            <li><Link to="/destinations/goa" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-blue-500 transition-colors duration-200">🏖️ Goa</Link></li>
                            <li><Link to="/destinations/jaipur" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-blue-500 transition-colors duration-200">🏰 Jaipur</Link></li>
                            <li><Link to="/destinations/varanasi" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-blue-500 transition-colors duration-200">🕉️ Varanasi</Link></li>
                            <li><Link to="/destinations/darjeeling" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-blue-500 transition-colors duration-200">🏞️ Darjeeling</Link></li>
                            <li><Link to="/destinations/paris" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-blue-500 transition-colors duration-200">🗼 Paris</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">Support</h4>
                        <ul className="space-y-2">
                            <li><Link to="/help" className="hover:text-blue-500 transition-colors duration-200">Help Center</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-500 transition-colors duration-200">Contact Us</Link></li>
                            <li><Link to="/privacy" className="hover:text-blue-500 transition-colors duration-200">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-blue-500 transition-colors duration-200">Terms of Service</Link></li>
                            <li><Link to="/faq" className="hover:text-blue-500 transition-colors duration-200">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">Stay Updated</h4>
                        <p className="text-sm">Subscribe to get the latest travel tips and destination updates.</p>
                        <div className="flex mt-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                            />
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center">
                                <FaPaperPlane />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-6">
                    <p className="text-sm">&copy; {new Date().getFullYear()} YourTripPlanner. All rights reserved.</p>
                    <div className="flex space-x-4 text-sm mt-2 md:mt-0">
                        <Link to="/sitemap" className="hover:text-blue-500 transition-colors duration-200">Sitemap</Link>
                        <span>|</span>
                        <Link to="/accessibility" className="hover:text-blue-500 transition-colors duration-200">Accessibility</Link>
                        <span>|</span>
                        <Link to="/cookies" className="hover:text-blue-500 transition-colors duration-200">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;