import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

// NOTE: All external dependencies (Firebase, react-icons, zxcvbn, react-toastify, ThemeContext)
// have been removed to ensure the code is self-contained and compiles.

export default function Signup({ setIsLoggedIn }) {
  const navigate = useNavigate();
  // Using a default theme since external context is removed
  const theme = 'light'; 
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Placeholder for password strength logic (removed external library zxcvbn)
  const getStrengthLabel = (p) => {
    if (p.length < 6) return "Too Short";
    if (p.length < 9) return "Weak";
    return "Fair";
  };
  
  const getStrengthColor = (label) => {
    if (label === "Too Short") return "text-red-500";
    if (label === "Weak") return "text-orange-400";
    return "text-green-500";
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  // Placeholder Signup function (Firebase removed)
  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      console.error("Please fill all fields"); // Using console.error instead of toast.error
      return;
    }
    
    // Simulate API call delay
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Signed up successfully! (Placeholder)");
      // In a real app, successful signup would happen here.
      // Since this is a placeholder, we simulate success and navigate.
      navigate("/plan"); 
    }, 1500);
  };

  // Placeholder OAuth Sign-in functions (Firebase removed)
  const handleGoogleSignIn = () => {
    console.error("Google Sign-in is disabled in this self-contained preview.");
  };

  const signInWithMicrosoft = () => {
    console.error("Microsoft Sign-in is disabled in this self-contained preview.");
  };

  const signInWithApple = () => {
    console.error("Apple Sign-in is disabled in this self-contained preview.");
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Sign up | Your Trip Planner';
  }, []);

  const strengthLabel = getStrengthLabel(password);
  const strengthColor = getStrengthColor(strengthLabel);

  return (
    <div className={`relative flex flex-col lg:flex-row items-center justify-center min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
      // Removed background image path as it is an external asset
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 transition-opacity duration-300"></div>
      
      {/* Form and Hero container for side-by-side layout */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl transition-colors duration-300">
        
        {/* Hero Section */}
        <div className="hidden lg:flex w-full lg:w-1/2 p-8 text-white flex-col items-center justify-center bg-gray-900 dark:bg-gray-700 bg-opacity-70 dark:bg-opacity-70 rounded-l-xl">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Plan Your Next Adventure
          </h1>
          <p className="text-lg text-center mb-8">
            Discover amazing places and create unforgettable memories.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-yellow-500 text-gray-900 font-bold rounded-full shadow-lg hover:bg-yellow-600 transition-colors duration-300"
          >
            Start Planning →
          </button>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 bg-white dark:bg-gray-800 rounded-xl lg:rounded-r-xl lg:rounded-l-none shadow-lg transition-colors duration-300 backdrop-filter backdrop-blur-lg bg-opacity-40 dark:bg-opacity-40">
          <form className="space-y-6" onSubmit={handleSignup}>
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Sign Up</h2>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70 dark:text-white"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70 dark:text-white"
              required
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70 dark:text-white"
              required
            />
            
          {/* Simplified Password strength feedback */}
          <div className="!mt-0 h-3 pt-1">
            {password && (
             <p className="text-xs font-semibold mt-1 text-gray-700 dark:text-gray-300">
                Strength: <span className={strengthColor}>{strengthLabel}</span>
              </p>
            )}
            </div>


            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="form-checkbox h-4 w-4 text-blue-600 rounded"
              />
              Show Password
            </label>

            <button 
              type="submit" 
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin mx-auto" />
              ) : (
                "Create Account"
              )}
            </button>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300 dark:border-gray-600" />
              <span className="px-4 text-gray-500 dark:text-gray-400">OR</span>
              <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <span className="text-xl">G</span> 
              <span>Continue with Google (Disabled)</span>
            </button>

            <button
              type="button"
              onClick={signInWithMicrosoft}
              className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                alt="Microsoft logo"
                className="w-5 h-5"
              />
              <span>Continue with Microsoft (Disabled)</span>
            </button>

            <button
              type="button"
              onClick={signInWithApple}
              className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <span className="text-xl"></span>
              <span>Continue with Apple (Disabled)</span>
            </button>

            <p className="text-center text-sm text-gray-700 dark:text-gray-300">
              Already have an Account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      {/* ToastContainer removed since react-toastify is not available */}
    </div>
  );
}
