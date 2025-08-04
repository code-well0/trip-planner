
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";

import HomeSplit from "./pages/HomeSplit";
import PlanTrip from "./pages/PlanTrip";
import ExpenseTracker from "./pages/ExpenseTracker";
import ChatBot from "./pages/Chatbot";
import Login from "./pages/login";
import Signup from "./pages/Signup";

import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 🔐 Global login state

  return (
    <>
      {/* ✅ Navbar reacts to login status */}
      <Navbar isLoggedIn={isLoggedIn} />

      <Routes>
        {/* Signup page */}
        <Route
          path="/"
          element={<HomeSplit setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Login page */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Protected routes */}
        <Route
          path="/plan"
          element={isLoggedIn ? <PlanTrip /> : <Navigate to="/login" />}
        />
        <Route
          path="/expenses"
          element={isLoggedIn ? <ExpenseTracker /> : <Navigate to="/login" />}
        />
        <Route
          path="/api/chat"
          element={isLoggedIn ? <ChatBot /> : <Navigate to="/login" />}
        />

        {/* Fallback route (optional) */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;



// import React, { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./Components/Navbar"; // ✅ your navbar component
// import HomeSplit from "./pages/HomeSplit";
// import PlanTrip from "./pages/PlanTrip";
// import ExpenseTracker from "./pages/ExpenseTracker";
// import ChatBot from "./pages/Chatbot";
// import "./index.css";
// import Login from "./pages/login";
// // import PlanTrip from "./pages/PlanTrip";

// // import HomeSplit from "./pages/HomeSplit";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // 🔐 login state

//   return (
//     <>
//       <Navbar isLoggedIn={isLoggedIn} />{" "}
//       {/* ✅ navbar now knows if logged in */}
//       <Routes>
//         <Route path="/" element={<HomeSplit setIsLoggedIn={setIsLoggedIn} />} />

//         <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

//         <Route
//           path="/plan"
//           element={isLoggedIn ? <PlanTrip /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/expenses"
//           element={isLoggedIn ? <ExpenseTracker /> : <Navigate to="/" />}
//         />

//         <Route
//           path="/api/chat"
//           element={isLoggedIn ? <ChatBot /> : <Navigate to="/" />}
//         />

//         <Route path="/login" element={<Login />} />
//         <Route path="/HomeSplit" element={<HomeSplit />} />
//         <Route path="/plan" element={<PlanTrip />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

