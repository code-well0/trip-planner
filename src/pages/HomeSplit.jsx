import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./HomeSplit.css";

export default function HomeSplit({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

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

  const handleStartPlanningClick = () => {
    if (isSignedIn) {
      navigate("/plan");
    } else {
      alert("Please sign up first!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoggedIn(true);
      setIsSignedIn(true);
      console.log("Signed up successfully:", form);
      // navigate("/plan"); // Optional redirect
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
            <button onClick={handleStartPlanningClick}>Start Planning →</button>
          </div>

          {/* Signup Section */}
          <div className="signup-box">
            <form className="signup-form" onSubmit={handleSubmit}>
              <h2>Sign Up</h2>

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <div className="error">{errors.name}</div>}

              <input
                type="email"
                name="email"
                placeholder="abc@gmail.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <div className="error">{errors.password}</div>}

              <button type="submit">Create Account</button>

              <p style={{ textAlign: "center" }}>
                Already have an Account?{" "}
                <Link to="/login" style={{ color: "blue" }}>
                  Login
                </Link>
              </p>
            </form>

            {isSignedIn && (
              <p className="success-message">Signed in successfully!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}






// import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import "./HomeSplit.css";
// import Login from "./login";

// export default function HomeSplit({ setIsLoggedIn }) {
//   const nameInputRef = useRef(null);
//   const navigate = useNavigate(); // ✅ use React Router for navigation
//   const [isSignedIn, setIsSignedIn] = useState(false);

//   const handleStartPlanningClick = () => {
//     if (isSignedIn) {
//       navigate("/plan"); // ⬅️ only navigate if signed in
//     } else {
//       alert("Please sign up first!");
//     }
//   };

//   return (
//     <div className="page-background">
//       <div className="overlay">
//         <div className="split-content">
//           {/* Hero Section */}
//           <div className="hero-box">
//             <h1>Plan Your Next Adventure</h1>
//             <p>Discover amazing places and create unforgettable memories.</p>
//             <button onClick={handleStartPlanningClick}>Start Planning →</button>
//           </div>

//           {/* Signup Section */}
//           <div className="signup-box">
//             <form
//               className="signup-form"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 setIsLoggedIn(true);
//                 setIsSignedIn(true); // ✅ stays active
//                 // navigate("/plan");   // ✅ no reload!
//               }}
//             >
//               <h2>Sign Up</h2>
//               <input
//                 ref={nameInputRef}
//                 type="text"
//                 placeholder="Name"
//                 required
//               />
//               <input type="email" placeholder="Email" required />
//               <input type="password" placeholder="Password" required />
//               <button type="submit">Create Account</button>
//               {/* <br /> */}
//               <p style={{ textAlign: "center" }}>
//                 Already have an Account ?{" "}
//                 <Link to="/login" style={{ color: "blue" }}>
//                   Login
//                 </Link>
//               </p>
//             </form>
//             {isSignedIn && (
//               <p className="success-message">Signed in successfully!</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


