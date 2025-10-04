import React from "react";
import "./Skeleton.css";

const SkeletonCard = ({ lines = 3 }) => {
  return (
    <div className="skeleton-card">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton-line"></div>
      ))}
    </div>
  );
};

export default SkeletonCard;
