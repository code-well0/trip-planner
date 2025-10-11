import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./Components/Navbar";
import { useTheme } from "./contexts/ThemeContext";
import SmoothCursor from "./Components/SmoothCursor";
import DestinationPage from "./pages/DestinationPage";
import ExpenseTracker from "./pages/ExpenseTracker";
import ChatBot from "./pages/Chatbot";
import Login from "./pages/login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import TripRecommender from "./pages/TripRecommender";
import TermsOfService from "./pages/terms";
import ActivityPlanner from "./pages/ActivityPlanner";
import PlanTrip from "./pages/PlanTrip";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import AddBlog from "./pages/AddBlog";
import Blogs from "./pages/Blogs";
import AboutUs from "./pages/AboutUs";
import HelpCenter from "./pages/HelpCenter";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";
import "./index.css";
import Footer from "./Components/Footer";
import Signup from "./pages/Signup";
import { InterestedProvider } from "./contexts/InterestedContext";
import Interested from "./pages/interested";
import Dashboard from "./pages/Dashboard";
import BackToTop from "./Components/BackToTop";
import Features from "./Components/feature";

// ✅ Import CurrencyConverter Component
import CurrencyConverter from "./Components/CurrencyConverter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// A simple Home component for demonstration
import WeatherWidget from "./Components/WeatherWidget";
import PackingChecklist from "./pages/PackingChecklist";
// Reusable page transition wrapper
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    className="min-h-full"
  >
    {children}
  </motion.div>
);

function App() {
  const { theme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <InterestedProvider>
      <div
        className={`bg-gray-100 dark:bg-gray-900 transition-colors duration-300 min-h-screen ${theme}`}
      >
        <SmoothCursor />

        <Navbar
          isLoggedIn={isLoggedIn}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="pt-0 flex-grow overflow-x-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              {/* Public Homepage */}
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                }
              />

              {/* Auth Pages */}
              <Route
                path="/signup"
                element={
                  !isLoggedIn ? (
                    <PageTransition>
                      <Signup setIsLoggedIn={setIsLoggedIn} />
                    </PageTransition>
                  ) : (
                    <Navigate to="/dashboard" />
                  )
                }
              />
              <Route
                path="/login"
                element={
                  !isLoggedIn ? (
                    <PageTransition>
                      <Login setIsLoggedIn={setIsLoggedIn} />
                    </PageTransition>
                  ) : (
                    <Navigate to="/dashboard" />
                  )
                }
              />

              {/* After login → Dashboard */}
              <Route
                path="/dashboard"
                element={
                  isLoggedIn ? (
                    <PageTransition>
                      <Dashboard setIsLoggedIn={setIsLoggedIn} />
                    </PageTransition>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              {/* Main Features */}
              <Route
                path="/plan"
                element={
                  isLoggedIn ? (
                    <PageTransition>
                      <PlanTrip searchQuery={searchQuery} />
                    </PageTransition>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/expenses"
                element={
                  isLoggedIn ? (
                    <PageTransition>
                      <ExpenseTracker />
                    </PageTransition>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/api/chat"
                element={
                  isLoggedIn ? (
                    <PageTransition>
                      <ChatBot />
                    </PageTransition>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route
                path="/TripRecommender"
                element={
                  isLoggedIn ? (
                    <PageTransition>
                      <TripRecommender />
                    </PageTransition>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/activity-planner"
                element={
                  isLoggedIn ? (
                    <PageTransition>
                      <ActivityPlanner />
                    </PageTransition>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              {/* Blogs */}
              <Route
                path="/blog"
                element={
                  isLoggedIn ? (
                    <PageTransition>
                      <Blog />
                    </PageTransition>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/blogs/:id"
                element={
                  isLoggedIn ? (
                    <PageTransition>
                      <BlogDetail />
                    </PageTransition>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/add-blog"
                element={
                  isLoggedIn ? (
                    <PageTransition>
                      <AddBlog />
                    </PageTransition>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/blogs"
                element={
                  isLoggedIn ? (
                    <PageTransition>
                      <Blogs />
                    </PageTransition>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              {/* User Profile */}
              <Route
                path="/profile"
                element={
                  isLoggedIn ? (
                    <PageTransition>
                      <Profile />
                    </PageTransition>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/interested"
                element={
                  isLoggedIn ? (
                    <PageTransition>
                      <Interested />
                    </PageTransition>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              {/*  Currency Converter */}
              <Route
                path="/currency-converter"
                element={
                  isLoggedIn ? (
                    <PageTransition>
                      <CurrencyConverter />
                    </PageTransition>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/packing-list"
                element={
                  isLoggedIn ? (
                    <PageTransition>
                      <PackingChecklist />
                    </PageTransition>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              {/* Weather Widget */}
              <Route
                path="/weather"
                element={
                  isLoggedIn ? (
                    <PageTransition>
                      <WeatherWidget />
                    </PageTransition>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              {/* Static Pages */}
              <Route
                path="/terms"
                element={
                  <PageTransition>
                    <TermsOfService />
                  </PageTransition>
                }
              />
              <Route
                path="/about"
                element={
                  <PageTransition>
                    <AboutUs />
                  </PageTransition>
                }
              />
              <Route
                path="/help"
                element={
                  <PageTransition>
                    <HelpCenter />
                  </PageTransition>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageTransition>
                    <ContactUs />
                  </PageTransition>
                }
              />
              <Route
                path="/privacy"
                element={
                  <PageTransition>
                    <PrivacyPolicy />
                  </PageTransition>
                }
              />
              <Route
                path="/faq"
                element={
                  <PageTransition>
                    <FAQ />
                  </PageTransition>
                }
              />

              {/* Destination Pages */}
              <Route
                path="/destinations/:id"
                element={
                  <PageTransition>
                    <DestinationPage />
                  </PageTransition>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>
        </div>

        <Footer isLoggedIn={isLoggedIn} />

        <BackToTop />

        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          pauseOnHover
          theme="colored"
        />
      </div>
    </InterestedProvider>
  );
}

export default App;
