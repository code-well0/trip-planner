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

    // ripple effect with subtle blue
    const createRipple = (x, y) => {
      const ripple = document.createElement("span");
      ripple.style.position = "fixed";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = "10px";
      ripple.style.height = "10px";
      ripple.style.borderRadius = "50%";
      ripple.style.pointerEvents = "none";
      ripple.style.background = "#4da6ff"; // soft blue
      ripple.style.opacity = "0.6";
      ripple.style.transform = "translate(-50%, -50%) scale(0)";
      ripple.style.zIndex = "9999";
      ripple.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";
      ripple.style.boxShadow = "0 0 8px #4da6ff, 0 0 20px #4da6ff";

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
      createRipple(mouseX, mouseY);
      setIsMoving(true);
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
      moveTimeout.current = setTimeout(() => setIsMoving(false), 300);
    };

    window.addEventListener("mousemove", handleMouseMove);

    let posX = mouseX;
    let posY = mouseY;

    const animate = () => {
      if (isMoving) {
        posX += (mouseX - posX) * 0.2;
        posY += (mouseY - posY) * 0.2;
        ball.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animate);
    };
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
        width: 12,
        height: 12,
        borderRadius: "50%",
        pointerEvents: "none",
        background: "#4da6ff", // subtle soft blue color
        boxShadow: "0 0 8px #4da6ff, 0 0 20px #4da6ff",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        transition: "width 0.1s, height 0.1s",
      }}
    />
  );
};

export default LiquidNeonCursor;
