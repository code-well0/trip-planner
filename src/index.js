import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react'
const PUBLISHABLE_KEY = process.env.REACT_APP_YOUR_API_KEY_NAME
const root = ReactDOM.createRoot(document.getElementById('root'));

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

root.render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>

  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ClerkProvider>
);
