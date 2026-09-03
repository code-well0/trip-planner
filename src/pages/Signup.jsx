import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../contexts/ThemeContext";
import { FaGoogle, FaApple } from "react-icons/fa";
import {
  OAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";
import { updateProfile } from "firebase/auth";

export default function Signup({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [passwordValidity, setPasswordValidity] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const nameRef = useRef(null);

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);

    // Score calculation: simple logic, 0–4
    let tempScore = 0;
    if (val.length >= 8) tempScore++;
    if (/[A-Z]/.test(val)) tempScore++;
    if (/[a-z]/.test(val)) tempScore++;
    if (/[0-9]/.test(val)) tempScore++;
    if (/[^A-Za-z0-9]/.test(val)) tempScore++;
    setScore(tempScore > 4 ? 4 : tempScore);

    setPasswordValidity({
      length: val.length >= 8,
      uppercase: /[A-Z]/.test(val),
      lowercase: /[a-z]/.test(val),
      number: /[0-9]/.test(val),
      special: /[^A-Za-z0-9]/.test(val),
    });
  };

  const barColors = [
    "bg-red-500",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-green-600",
  ];

  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    const isStrong = Object.values(passwordValidity).every(Boolean);
    if (!isStrong) {
      toast.error("Password is too weak. Follow all rules.");
      return;
    }

    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        try {
          // build default avatar URL (ui-avatars)
          const defaultProfilePic = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            name
          )}&background=random`;

          // update firebase auth profile
          await updateProfile(user, {
            displayName: name,
            photoURL: defaultProfilePic,
          });

          // persist locally (Profile.jsx will read these)
          localStorage.setItem(`username_${user.uid}`, name);
          localStorage.setItem(`profilePic_${user.uid}`, defaultProfilePic);

          toast.success("Signed up successfully!");
          setIsLoading(false);
          navigate("/plan");
        } catch (innerErr) {
          // even if updateProfile fails, continue
          console.error("updateProfile error:", innerErr);
          toast.success("Signed up (profile update failed).");
          setIsLoading(false);
          navigate("/plan");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.code === "auth/email-already-in-use")
          toast.error("Email already in use.");
        else if (err.code === "auth/weak-password")
          toast.error("Weak password.");
        else toast.error("Failed to create account.");
        console.error(err);
      });
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithPopup(auth, provider);
      setIsLoggedIn(true);
      toast.success("Signed up with Google!");
      navigate("/plan");
    } catch (err) {
      console.error(err);
      toast.error("Google sign-in failed.");
    }
  };

  const signInWithMicrosoft = async () => {
    const provider = new OAuthProvider("microsoft.com");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Welcome ${user.displayName || user.email}!`);
      setIsLoggedIn(true);
      navigate("/plan");
    } catch (err) {
      console.error(err);
      toast.error("Microsoft login failed.");
    }
  };

  const signInWithApple = async () => {
    const provider = new OAuthProvider("apple.com");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Welcome ${user.displayName || user.email}!`);
      setIsLoggedIn(true);
      navigate("/plan");
    } catch (err) {
      console.error(err);
      toast.error("Apple login failed.");
    }
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
            <div className="w-16 h-16 mb-5 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>

            <h1 className="text-3xl font-extrabold mb-3 text-center leading-tight">
              <span className={`bg-clip-text text-transparent ${theme === 'dark' ? 'bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400' : 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500'}`}>
                Join the
              </span>
              <br />
              <span className={`bg-clip-text text-transparent ${theme === 'dark' ? 'bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'}`}>
                Adventure
              </span>
            </h1>

            <p className={`text-sm text-center mb-6 leading-relaxed max-w-[250px] ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
              Create your account and start planning unforgettable trips.
            </p>

            <button
              type="button"
              onClick={() => nameRef.current?.focus()}
              className="group px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-sm rounded-full shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              Get Started
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
          <form className="px-7 py-5 flex flex-col gap-3" onSubmit={handleSignup}>
            {/* Header */}
            <div className="text-center mb-1">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                Create Account
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Fill in your details to get started
              </p>
            </div>

            {/* Name */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-[1px]"></div>
              <input
                ref={nameRef}
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="relative w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600/50 rounded-lg focus:outline-none focus:border-transparent bg-gray-50 dark:bg-gray-800/60 text-gray-800 dark:text-white placeholder-gray-400 text-sm transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-[1px]"></div>
              <input
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
                onChange={handlePasswordChange}
                required
                className="relative w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600/50 rounded-lg focus:outline-none focus:border-transparent bg-gray-50 dark:bg-gray-800/60 text-gray-800 dark:text-white placeholder-gray-400 text-sm transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Show Password */}
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
            </div>

            {/* Password Strength Bar */}
            {password && (
              <div>
                <div className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-500 ${i <= score ? barColors[score] : 'bg-transparent'}`}
                    />
                  ))}
                </div>
                <p className={`text-[10px] mt-1 font-medium ${score <= 1 ? 'text-red-500' : score <= 2 ? 'text-orange-500' : score <= 3 ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-500'}`}>
                  {strengthLabels[score]}
                </p>
              </div>
            )}

            {/* Password Rules */}
            {password && (
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                <AnimatePresence>
                  {Object.keys(passwordValidity).map((rule) => (
                    <motion.p
                      key={rule}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`text-[11px] flex items-center gap-1 ${
                        passwordValidity[rule]
                          ? "text-green-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      <span>{passwordValidity[rule] ? "✓" : "○"}</span>
                      {rule.charAt(0).toUpperCase() + rule.slice(1)}
                    </motion.p>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent"></div>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wider uppercase">or</span>
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent"></div>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col gap-2">
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
                onClick={signInWithMicrosoft}
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
                onClick={signInWithApple}
                className="w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2.5 border border-gray-300 dark:border-gray-600/40 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-gray-500/60 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
              >
                <FaApple size={16} className="text-gray-700 dark:text-gray-200" />
                Continue with Apple
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 pt-1">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors duration-200">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

