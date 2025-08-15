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

function SignupForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (form.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };


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


    console.log("Form submitted"); // Debug
    const validationErrors = validate();
    console.log("Validation Errors:", validationErrors); // Debug
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);
      console.log("Form submitted successfully:", form);
    } else {
      setIsSubmitted(false);


    // Basic validation
    if (name && email && password) {
      setIsLoading(true); // Set loading state to true when signup is initiated

      toast.success("Signup successful!");
      
      setTimeout(() => {
        setIsLoggedIn(true);  // Set login state to true
        setIsLoggedInLocal(true);  // Track login state in component state
        setIsLoading(false);  // Reset loading state
        navigate("/plan");  // Redirect after showing the toast
      }, 1500); // Wait for 1.5 seconds before redirecting

    } else {
      toast.error("Please fill all fields");


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

    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </label>
        {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        <br />

        <button type="submit">Signup</button>

        {isSubmitted && (
          <p style={{ color: "green" }}>Form Submitted successfully!</p>
        )}
      </form>

    <div className="page-background">
      <div className="overlay">
        <div className="split-content">
          {/* Hero Section */}
          <HeroSection/>
          {/* Signup Section */}
          <div className="signup-box">
            <form className="signup-form space-y-4" onSubmit={handleSignup}>
              <h2 className="text-3xl font-bold">Sign Up</h2>

              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300"
                required
              />

    <div className={`relative flex flex-col lg:flex-row items-center justify-center min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
      style={{ backgroundImage: `url('./images/India on the Road.jpeg')` }}
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

            <button type="button" className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center space-x-2" onClick={handleGoogleSignIn}>
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



export default SignupForm;

