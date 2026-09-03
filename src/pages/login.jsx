import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../contexts/ThemeContext";
import { FaGoogle, FaApple } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoading(false);
        toast.success("Login successful!");
        navigate("/plan");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Incorrect email or password.");
        console.error("Error during login:", error);
      });
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithPopup(auth, provider);
      setIsLoggedIn(true);
      toast.success("Logged in with Google successfully!");
      navigate("/plan");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to sign in with Google.");
    }
  };

  const handleMicrosoftSignIn = async () => {
    const provider = new OAuthProvider("microsoft.com");
    try {
      await signInWithPopup(auth, provider);
      setIsLoggedIn(true);
      toast.success("Logged in with Microsoft successfully!");
      navigate("/plan");
    } catch (error) {
      console.error("Microsoft login error:", error);
      toast.error("Failed to sign in with Microsoft.");
    }
  };

  const handleAppleSignIn = async () => {
    const provider = new OAuthProvider("apple.com");
    try {
      await signInWithPopup(auth, provider);
      setIsLoggedIn(true);
      toast.success("Logged in with Apple successfully!");
      navigate("/plan");
    } catch (error) {
      console.error("Apple login error:", error);
      toast.error("Failed to sign in with Apple.");
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("Password reset email sent! Please check your inbox.");
      })
      .catch((error) => {
        console.error("Password reset error:", error);
        toast.error("Failed to send password reset email.");
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
      style={{
        backgroundImage: `url('./images/India on the Road.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "calc(100vh - 72px)",
        padding: "16px",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/75 backdrop-blur-[2px]"></div>

      {/* Main Card */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-[900px] rounded-2xl overflow-hidden"
        style={{
          maxHeight: "calc(100vh - 104px)",
          boxShadow: theme === 'dark'
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255,255,255,0.1)'
        }}
      >
        {/* Hero Section */}
        <div
          className="hidden lg:flex w-full lg:w-[45%] flex-col items-center justify-center relative overflow-hidden"
          style={{
            background: theme === 'dark'
              ? "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.92) 50%, rgba(51,65,85,0.88) 100%)"
              : "linear-gradient(135deg, rgba(239,246,255,0.97) 0%, rgba(224,231,255,0.95) 50%, rgba(237,233,254,0.93) 100%)",
          }}
        >
          {/* Decorative Gradient Orbs */}
          <div className={`absolute -top-20 -left-20 w-56 h-56 rounded-full blur-3xl ${theme === 'dark' ? 'bg-gradient-to-br from-yellow-400/30 to-orange-500/20' : 'bg-gradient-to-br from-blue-300/40 to-indigo-300/30'}`}></div>
          <div className={`absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-3xl ${theme === 'dark' ? 'bg-gradient-to-tr from-pink-500/25 to-purple-500/15' : 'bg-gradient-to-tr from-orange-200/40 to-pink-200/30'}`}></div>

          <div className="relative z-10 flex flex-col items-center justify-center px-8 py-10">
            {/* Icon */}
            <div className="w-16 h-16 mb-5 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h1 className="text-3xl font-extrabold mb-3 text-center leading-tight">
              <span className={`bg-clip-text text-transparent ${theme === 'dark' ? 'bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400' : 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500'}`}>
                Plan Your Next
              </span>
              <br />
              <span className={`bg-clip-text text-transparent ${theme === 'dark' ? 'bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'}`}>
                Adventure
              </span>
            </h1>

            <p className={`text-sm text-center mb-6 leading-relaxed max-w-[250px] ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
              Discover amazing places and create unforgettable memories.
            </p>

            <button
              type="button"
              onClick={() => emailRef.current?.focus()}
              className="group px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-sm rounded-full shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              Start Planning
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div
          className="w-full lg:w-[55%] overflow-y-auto"
          style={{
            background: theme === 'dark'
              ? "rgba(15, 23, 42, 0.92)"
              : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            borderLeft: theme === 'dark' ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(255,255,255,0.3)',
          }}
        >
          <form className="px-7 py-6 flex flex-col gap-4" onSubmit={handleLogin}>
            {/* Header */}
            <div className="text-center mb-1">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                Welcome Back
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sign in to continue your journey
              </p>
            </div>

            {/* Email */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-[1px]"></div>
              <input
                ref={emailRef}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="relative w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600/50 rounded-lg focus:outline-none focus:border-transparent bg-gray-50 dark:bg-gray-800/60 text-gray-800 dark:text-white placeholder-gray-400 text-sm transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-[1px]"></div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="relative w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600/50 rounded-lg focus:outline-none focus:border-transparent bg-gray-50 dark:bg-gray-800/60 text-gray-800 dark:text-white placeholder-gray-400 text-sm transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Show Password / Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 cursor-pointer select-none hover:text-gray-900 dark:hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="form-checkbox h-3.5 w-3.5 rounded text-blue-500 border-gray-400 dark:border-gray-500 bg-transparent focus:ring-blue-500 focus:ring-offset-0"
                />
                Show Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Log In"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent"></div>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wider uppercase">or</span>
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent"></div>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2.5 border border-gray-300 dark:border-gray-600/40 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-gray-500/60 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
              >
                <FaGoogle size={16} className="text-red-400" />
                Continue with Google
              </button>

              <button
                type="button"
                onClick={handleMicrosoftSignIn}
                className="w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2.5 border border-gray-300 dark:border-gray-600/40 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-gray-500/60 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                  alt="Microsoft logo"
                  className="w-4 h-4"
                />
                Continue with Microsoft
              </button>

              <button
                type="button"
                onClick={handleAppleSignIn}
                className="w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2.5 border border-gray-300 dark:border-gray-600/40 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-gray-500/60 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
              >
                <FaApple size={16} className="text-gray-700 dark:text-gray-200" />
                Continue with Apple
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 pt-1">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors duration-200">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
