
import React from "react";

/**
 * SkeletonCard Component
 * Reusable loading placeholder with shimmer effect.
 * Usage: Show while data is being fetched.
 */
export default function SkeletonCard({ height = "auto" }) {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden"
    style={{ height }}>
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>

      {/* Text placeholders */}
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>

        {/* Tags placeholder */}
        <div className="flex gap-2">
          <div className="h-5 w-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

