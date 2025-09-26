import React from "react";
import "./Loader.css";

const Loader = ({ size = 50 }) => {
  return (
    <div
      className="spinner"
      style={{ width: size, height: size }}
    ></div>
  );
};

export default Loader;
