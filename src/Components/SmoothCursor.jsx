// src/Components/LiquidNeonCursor.jsx
import React, { useEffect, useRef } from "react";

const LiquidNeonCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth easing
      posX += (mouseX - posX) * 0.2;
      posY += (mouseY - posY) * 0.2;

      // Liquid/stretch effect
      const diffX = mouseX - posX;
      const diffY = mouseY - posY;
      const scaleX = 1 + Math.min(Math.abs(diffX) * 0.01, 0.5);
      const scaleY = 1 + Math.min(Math.abs(diffY) * 0.01, 0.5);

      cursor.style.transform = `translate(${posX}px, ${posY}px) scaleX(${scaleX}) scaleY(${scaleY})`;

      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none"
      style={{
        transform: "translate(-50%, -50%)",
        background: "linear-gradient(45deg, #ff00ff, #00ffff)",
        opacity: 0.65, // less transparent, almost fully opaque
        boxShadow:
          "0 0 15px #ff00ff, 0 0 30px #00ffff, 0 0 45px #ff00ff, 0 0 60px #00ffff",
        zIndex: 9999,
        transition: "width 0.1s, height 0.1s",
      }}
    ></div>
  );
};

export default LiquidNeonCursor;
