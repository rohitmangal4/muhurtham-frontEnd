// src/components/Loader.jsx
import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-deepPlum">
      <div className="w-12 h-12 border-4 border-warmPeach border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
};

export default Loader;
