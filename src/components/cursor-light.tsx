"use client";
import React from "react";

// Kept for backward compatibility if imported elsewhere
// Prefer using CursorLightCard from hooks/cursor-light
const CursorLight: React.FC<{ className?: string }> = ({ className = "" }) => {
  return <div className={className} />;
};

export default CursorLight;