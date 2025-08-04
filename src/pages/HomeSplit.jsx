import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";  // Import React Hook Form
import { Loader2 } from "lucide-react";  // Import Loading spinner from Lucide
import "./HomeSplit.css"; // Keep your custom CSS for the background

export default function HomeSplit({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // To manage loading state

  // Use React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Handle the form submission
  const onSubmit = async (data) => {
    setIsLoading(true); // Start loading animation

    // Simulate account creation (replace with actual API call)
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsSignedIn(true);
      setIsLoading(false); // Stop loading animation
      navigate("/plan"); // Redirect to /plan after successful sign-up
    }, 2000); // Simulate network delay
  };

  return (
    <div className="page-background">
      <div className="overlay">
        <div className="split-content">
          {/* Hero Section */}
          <div className="hero-box">
            <h1 className="text-4xl font-bold text-white">Plan Your Next Adventure</h1>
            <p className="text-xl text-white mt-2">Discover amazing places and create unforgettable memories.</p>
            <button 
              onClick={() => navigate("/plan")}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Start Planning →
            </button>
          </div>

          {/* Signup Section */}
          <div className="signup-box bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
            <form className="signup-form space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
              
              {/* Name Input */}
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

              {/* Email Input */}
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

              {/* Password Input */}
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin mr-2" size={20} /> // Spinner from lucide-react
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Login Link */}
              <p className="text-center text-sm mt-4">
                Already have an Account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </p>
            </form>

            {isSignedIn && (
              <p className="text-green-500 text-center mt-4 font-semibold">Account created successfully!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
