// src/components/EmptyState.jsx
import React from "react";
import { FaRegSadTear } from "react-icons/fa";

const EmptyState = ({ message = "Nothing found." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-mutedBlack">
      <FaRegSadTear className="text-5xl text-warmPeach mb-4" />
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
};

export default EmptyState;
