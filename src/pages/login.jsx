import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./HomeSplit.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeroSection from "../Components/Hero";
import { Loader2 } from "lucide-react";

// --- Firebase Imports ---
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from "firebase/auth";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
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
      .then((userCredential) => {
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
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      await signInWithPopup(auth, provider);
      setIsLoggedIn(true);
      toast.success("Logged in with Google successfully!");
      navigate("/plan");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      toast.error("Failed to sign in with Google.");
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
        console.error("Error sending password reset email:", error);
        toast.error("Failed to send password reset email.");
      });
  };

  return (
    <div className="page-background">
      <div className="overlay">
        <div className="split-content">
          <HeroSection/>
          <div className="signup-box">
            <form className="signup-form" onSubmit={handleLogin}>
              <h2>Login</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="password-options">
                <label>
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  Show Password
                </label>
                <span className="forgot-password" onClick={handleForgotPassword}>
                  Forgot Password?
                </span>
              </div>
              <button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin mx-auto" />
                ) : (
                  "Login"
                )}
              </button>
              <div className="divider">OR</div>
              <button type="button" className="google-btn" onClick={handleGoogleSignIn}>
                <svg viewBox="0 0 48 48" width="24px" height="24px">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.61-3.317-11.28-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.999,35.596,44,30.033,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                Continue with Google
              </button>
              <p style={{ textAlign: "center" }}>
                Don't have an Account?{" "}
                <Link to="/" style={{ color: "blue" }}>
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
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
