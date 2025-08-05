import React, { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";
import "./HomeSplit.css";

export default function Login() {
  const { signIn, setActive } = useSignIn();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const result = await signIn.create({
        identifier: email,
        password,
      });

      await setActive({ session: result.createdSessionId });
      navigate("/plan");
    } catch (err) {
      alert(err.errors?.[0]?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/plan",
      });
    } catch (err) {
      console.error("Google OAuth Error:", err);
    }
  };

  return (
    <div className="page-background">
      <div className="overlay">
        <div className="split-content">
          {/* Hero Section */}
          <div className="hero-box">
            <h1>Plan Your Next Adventure</h1>
            <p>Discover amazing places and create unforgettable memories.</p>
            <button>Start Planning →</button>
          </div>

          {/* Login Section */}
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

              <label style={{ display: "block", marginTop: "8px" }}>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  style={{ marginRight: "5px" }}
                />
                Show Password
              </label>

              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>

              <button type="button" onClick={handleGoogleLogin} style={{ marginTop: "10px" }}>
                Login with Google
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
    </div>
  );
}
