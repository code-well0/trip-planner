import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Loader2 } from "lucide-react";  // Import the loading spinner icon
import "react-toastify/dist/ReactToastify.css";
import HeroSection from "../Components/Hero";


export default function Signup({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedInLocal, setIsLoggedInLocal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleSignup = (e) => {
    e.preventDefault();

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
    }
  };

  return (
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

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300"
                required
              />

              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="form-checkbox h-4 w-4"
                />
                <span>Show Password</span>
              </label>

              <button 
                type="submit" 
                className="w-full p-3 mt-4 bg-blue-500 text-white rounded-md focus:outline-none disabled:bg-gray-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin mx-auto" />
                ) : (
                  "Create Account"
                )}
              </button>

              <p className="text-center mt-4">
                Already have an Account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </p>
            </form>

            {isLoggedInLocal && (
              <p className="success-message text-center text-green-600">Logged in successfully</p>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification Container */}
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
