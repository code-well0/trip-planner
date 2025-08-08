import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Loader2 } from "lucide-react";  // Import the loading spinner icon
import "react-toastify/dist/ReactToastify.css";
import HeroSection from "../Components/Hero";


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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedInLocal, setIsLoggedInLocal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

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

export default SignupForm;
