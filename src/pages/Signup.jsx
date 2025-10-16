import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
      className={`relative flex flex-col lg:flex-row items-center justify-center min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl">
        {/* Hero Section */}
        <div className="hidden lg:flex w-1/2 p-8 text-white flex-col items-center justify-center bg-gray-900 rounded-l-xl">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Plan Your Next Adventure
          </h1>
          <p className="text-lg text-center mb-8">
            Discover amazing places and create unforgettable memories.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-yellow-500 text-gray-900 font-bold rounded-full shadow-lg hover:bg-yellow-600"
          >
            Start Planning →
          </button>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 bg-white dark:bg-gray-800 rounded-xl lg:rounded-r-xl shadow-lg">
          <form className="space-y-6" onSubmit={handleSignup}>
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
              Sign Up
            </h2>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Password Strength Bar */}
            {password && (
              <div className="h-2 w-full bg-gray-200 rounded mt-2">
                <div
                  className={`${barColors[score]} h-2 rounded transition-all duration-500`}
                  style={{ width: `${(score / 5) * 100}%` }}
                />
              </div>
            )}

            {/* Password Rules */}
            {password && (
              <div className="mt-2 space-y-1">
                <AnimatePresence>
                  {Object.keys(passwordValidity).map((rule, idx) => (
                    <motion.p
                      key={rule}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`text-sm ${
                        passwordValidity[rule]
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {passwordValidity[rule] ? "✓" : "✗"}{" "}
                      {rule.charAt(0).toUpperCase() + rule.slice(1)}
                    </motion.p>
                  ))}
                </AnimatePresence>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "Create Account"
              )}
            </button>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="px-4 text-gray-500">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-3 bg-gray-100 rounded-lg flex items-center justify-center space-x-2"
            >
              <FaGoogle size={20} /> <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={signInWithMicrosoft}
              className="w-full py-3 bg-gray-100 rounded-lg flex items-center justify-center space-x-2 mt-2"
            >
              Microsoft
            </button>

            <button
              type="button"
              onClick={signInWithApple}
              className="w-full py-3 bg-gray-100 rounded-lg flex items-center justify-center space-x-2 mt-2"
            >
              <FaApple size={20} /> Apple
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <ToastContainer position="bottom-left" autoClose={3000} theme="colored" />
    </div>
  );
}
