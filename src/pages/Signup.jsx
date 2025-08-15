import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import HeroSection from "../Components/Hero";
import { useTheme } from '../contexts/ThemeContext';
import { FaGoogle } from "react-icons/fa";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export default function Signup({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedInLocal, setIsLoggedInLocal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        setIsLoggedIn(true);
        toast.success("Signed up successfully!");
        navigate("/plan");
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          toast.error("This email address is already in use.");
        } else if (error.code === 'auth/weak-password') {
          toast.error("Password should be at least 6 characters.");
        } else {
          toast.error("Failed to create an account.");
        }
        console.error("Error during signup:", error);
      });
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    
    try {
      await signInWithPopup(auth, provider);
      setIsLoggedIn(true);
      toast.success("Signed up with Google successfully!");
      navigate("/plan");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      toast.error("Failed to sign up with Google.");
    }
  };

  return (
    <div
      className={`relative flex flex-col lg:flex-row items-center justify-center min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}
      style={{ backgroundImage: `url('./images/India on the Road.jpeg')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 transition-opacity duration-300"></div>
      
      {/* Form and Hero container for side-by-side layout */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl transition-colors duration-300">
        
        {/* Hero Section */}
        <div className="hidden lg:flex w-full lg:w-1/2 p-8 text-white flex-col items-center justify-center bg-gray-900 dark:bg-gray-700 bg-opacity-70 dark:bg-opacity-70 rounded-l-xl">
          <HeroSection />
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70 dark:text-white"
              required
            />

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
              className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center space-x-2" 
              onClick={handleGoogleSignIn}
            >
              <FaGoogle />
              <span>Continue with Google</span>
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

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}