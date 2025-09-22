import React, { useEffect, useRef, useState } from "react";

const LiquidNeonCursor = () => {
  const ballRef = useRef(null);
  const [isMoving, setIsMoving] = useState(false);
  const moveTimeout = useRef(null);

  useEffect(() => {
    const ball = ballRef.current;
    if (!ball) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let posX = mouseX;
    let posY = mouseY;

    // Utility: create a random bright (neon-like) color
    const randomNeon = () => {
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 100%, 60%)`;
    };

    const createRipple = (x, y) => {
      const rippleColor = randomNeon();
      const ripple = document.createElement("span");
      Object.assign(ripple.style, {
        position: "fixed",
        left: `${x}px`,
        top: `${y}px`,
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        pointerEvents: "none",
        border: `2px solid ${rippleColor}`,
        background: rippleColor,
        opacity: "0.7",
        transform: "translate(-50%, -50%) scale(0)",
        zIndex: "9999",
        transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
        boxShadow: `0 0 8px ${rippleColor}, 0 0 20px ${rippleColor}`,
      });

      document.body.appendChild(ripple);

      requestAnimationFrame(() => {
        ripple.style.transform = "translate(-50%, -50%) scale(3)";
        ripple.style.opacity = "0";
      });

      setTimeout(() => ripple.remove(), 600);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // change ball color each move for a dynamic look
      const newColor = randomNeon();
      ball.style.background = newColor;
      ball.style.border = `2px solid ${newColor}`;
      ball.style.boxShadow = `0 0 8px ${newColor}, 0 0 20px ${newColor}`;

      createRipple(mouseX, mouseY);
      setIsMoving(true);

      if (moveTimeout.current) clearTimeout(moveTimeout.current);
      moveTimeout.current = setTimeout(() => setIsMoving(false), 300);
    };

    const animate = () => {
      if (isMoving) {
        posX += (mouseX - posX) * 0.2;
        posY += (mouseY - posY) * 0.2;
        ball.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
    };
  }, [isMoving]);

  return (
    <div
      ref={ballRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 14,
        height: 14,
        borderRadius: "50%",
        pointerEvents: "none",
        border: "2px solid #ff00ff",
        background: "#ff00ff",
        boxShadow: "0 0 8px #ff00ff, 0 0 20px #ff00ff",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        transition: "background 0.3s, border 0.3s, box-shadow 0.3s",
      }}
    />
  );
};

export default LiquidNeonCursor;
