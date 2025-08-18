import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from '../contexts/ThemeContext';
import { FaGoogle, FaApple } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../firebase";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoggedIn(true);
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

  return (
    <div className={`relative flex flex-col lg:flex-row items-center justify-center min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
      style={{ backgroundImage: `url('./images/India on the Road.jpeg')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70"></div>

      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl">
        
        {/* Hero Section */}
        <div className="hidden lg:flex w-full lg:w-1/2 p-8 text-white flex-col items-center justify-center bg-gray-900 dark:bg-gray-700">
          <h1 className="text-4xl font-bold mb-4 text-center">Plan Your Next Adventure</h1>
          <p className="text-lg text-center mb-8">Discover amazing places and create unforgettable memories.</p>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-yellow-500 text-gray-900 font-bold rounded-full shadow-lg hover:bg-yellow-600 transition"
          >
            Start Planning →
          </button>
        </div>

        <div className="w-full lg:w-1/2 p-8 bg-white dark:bg-gray-800 rounded-xl lg:rounded-r-xl shadow-lg">
          <form className="space-y-6" onSubmit={handleLogin}>
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Log In</h2>
      
            <input type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-900 dark:text-white" />
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} required
              className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-900 dark:text-white" />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                Show Password
              </label>
              <button type="button" onClick={handleForgotPassword} className="text-blue-600 dark:text-blue-400 hover:underline">
                Forgot Password?
              </button>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center justify-center">
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Login"}
            </button>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300 dark:border-gray-600" />
              <span className="px-4 text-gray-500 dark:text-gray-400">OR</span>
              <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            </div>

            <button type="button" onClick={handleGoogleSignIn}
              className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center gap-2">
              <FaGoogle /> <span>Continue with Google</span>
            </button>

            <button type="button" onClick={handleMicrosoftSignIn}
              className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="w-5 h-5" />
              <span>Continue with Microsoft</span>
            </button>

            <button type="button" onClick={handleAppleSignIn}
              className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center gap-2">
              <FaApple /> <span>Continue with Apple</span>
            </button>

            <p className="text-center text-sm text-gray-700 dark:text-gray-300">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>

      <ToastContainer position="bottom-left" autoClose={3000} theme="colored" />
    </div>
  );
}
