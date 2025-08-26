import React from "react";
import { useTheme } from '../contexts/ThemeContext';
import './privacy.css';

export default function PrivacyPolicy() {
    const { theme } = useTheme();

    return (
        <div className={`privacy-container ${theme}`}>
            <div className="privacy-content">
                <h1>Privacy Policy</h1>
                
                <div className="intro-section">
                    <p>
                        Welcome to YourTripPlanner . We are committed to protecting your privacy 
                        and ensuring the security of your personal information. This Privacy Policy explains how we collect, 
                        use, disclose, and safeguard your data when you use our website and services.
                    </p>
                    <p>
                        By accessing or using YourTripPlanner, you agree to the terms of this Privacy Policy. 
                        If you do not agree, please refrain from using our services.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>1. Information We Collect</h2>
                    <div className="subsection">
                        <h3>A. Personal Information</h3>
                        <p>When you use YourTripPlanner, we may collect:</p>
                        <ul>
                            <li><strong>Account Information:</strong> Name, email address, phone number (if provided).</li>
                            <li><strong>Travel Preferences:</strong> Destination interests, budget, travel dates.</li>
                            <li><strong>AI Assistant Interactions:</strong> Queries, travel suggestions, and chat history with our AI-powered assistant.</li>
                            <li><strong>Expense Data:</strong> Travel budgets, expenses logged by you (optional).</li>
                        </ul>
                    </div>
                    <div className="subsection">
                        <h3>B. Non-Personal Information</h3>
                        <p>We automatically collect:</p>
                        <ul>
                            <li><strong>Usage Data:</strong> Pages visited, time spent, clicks, and navigation patterns.</li>
                            <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
                            <li><strong>Cookies & Tracking:</strong> We use cookies to enhance user experience (you can disable them in browser settings).</li>
                        </ul>
                    </div>
                </div>

                <div className="policy-section">
                    <h2>2. How We Use Your Information</h2>
                    <p>We use the collected data to:</p>
                    <ul className="checklist">
                        <li>✅ Provide and improve YourTripPlanner services.</li>
                        <li>✅ Personalize travel recommendations and AI-powered suggestions.</li>
                        <li>✅ Enhance user experience with smart filtering and destination discovery.</li>
                        <li>✅ Analyze trends and optimize website performance.</li>
                        <li>✅ Communicate updates, offers, or support (if subscribed).</li>
                    </ul>
                </div>

                <div className="policy-section">
                    <h2>3. Data Sharing & Disclosure</h2>
                    <p>We do not sell your personal information. However, we may share data with:</p>
                    <ul>
                        <li><strong>Service Providers:</strong> Trusted third parties (e.g., cloud storage, analytics) assisting in operations.</li>
                        <li><strong>Legal Compliance:</strong> If required by law (e.g., court orders, fraud prevention).</li>
                        <li><strong>AI Model (Gemini 2.0 Flash):</strong> Your queries may be processed by Google's AI for generating responses.</li>
                    </ul>
                </div>

                <div className="policy-section">
                    <h2>4. Data Security</h2>
                    <p>
                        We implement industry-standard security measures, including encryption and secure servers, 
                        to protect your data. However, no online platform is 100% secure—always use strong passwords 
                        and avoid sharing sensitive details.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>5. Your Rights & Choices</h2>
                    <ul className="rights-list">
                        <li>🔹 <strong>Access & Correction:</strong> You can review or update your account details.</li>
                        <li>🔹 <strong>Deletion:</strong> Request deletion of your data (except where legally required).</li>
                        <li>🔹 <strong>Opt-Out:</strong> Unsubscribe from marketing emails.</li>
                        <li>🔹 <strong>Disable Cookies:</strong> Adjust browser settings to reject cookies.</li>
                    </ul>
                </div>

                <div className="last-updated">
                    <p>Last Updated: {new Date().toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
}