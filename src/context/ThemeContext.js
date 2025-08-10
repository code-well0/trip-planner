import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create a new Theme Context
// This will be the central place to store our theme state and toggle function.
const ThemeContext = createContext();

// 2. Create the ThemeProvider component
// This component will wrap your entire application and provide the theme context to all children.
export const ThemeProvider = ({ children }) => {
  // Use a state variable to hold the current theme ('light' or 'dark').
  const [theme, setTheme] = useState('light');

  // This useEffect runs once on the initial component mount to check for a saved theme
  // in local storage or the user's system preference.
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    // If a theme is saved, use that.
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Otherwise, check for the user's system preference.
      setTheme('dark');
    }
  }, []);

  // This useEffect runs whenever the 'theme' state changes.
  // It adds or removes the 'dark' class from the root <html> element,
  // which is how Tailwind CSS knows to apply its dark mode styles.
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // The function to toggle the theme. It updates the state and also saves the preference
  // to local storage so the theme persists across page refreshes.
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Provide the theme and the toggle function to the rest of the application.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Create a custom hook to use the theme context
// This hook provides a convenient way for any component to access the theme state and toggle function.
export const useTheme = () => useContext(ThemeContext);
