import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation(); //  detects route changes

  useEffect(() => {
    // scroll to top automatically on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300 animate-bounce"
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default BackToTop;
