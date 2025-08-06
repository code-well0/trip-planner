
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";

import HomeSplit from "./pages/HomeSplit";
import PlanTrip from "./pages/PlanTrip";
import ExpenseTracker from "./pages/ExpenseTracker";
import ChatBot from "./pages/Chatbot";
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TripRecommender from "./pages/TripRecommender";


import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />

      <Routes>
        <Route path="/" element={<HomeSplit setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

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
        <Route
          path="/TripRecommender"
          element={isLoggedIn ? <TripRecommender /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* ✅ Add this once at root level */}
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        pauseOnHover
        theme="colored"
      />
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

