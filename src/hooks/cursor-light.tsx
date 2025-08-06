"use client";
import React, { useState, createContext, useContext } from "react";

// Context do zarządzania stanem kursora globalnie
interface CursorContextType {
  setIsHoveringCard: (hovering: boolean) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const useCursorLight = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursorLight must be used within CursorLightProvider');
  }
  return context;
};

// Provider dla całej aplikacji
export const CursorLightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [, setIsHoveringCard] = useState(false);

  return (
    <CursorContext.Provider value={{ setIsHoveringCard }}>
      {children}
    </CursorContext.Provider>
  );
};

// Hook do użycia w komponencie kafelka
export const CursorLightCard: React.FC<{ 
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = "", onClick }) => {
  const { setIsHoveringCard } = useCursorLight();
  const [localMousePosition, setLocalMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLocalMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    setIsHoveringCard(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsHoveringCard(false);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ isolation: 'isolate' }}
    >
      {/* Lokalne światełko dla tego kafelka */}
      <div 
        className={`absolute pointer-events-none z-10 w-120 h-120 transition-opacity duration-200 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: localMousePosition.x - 240,
          top: localMousePosition.y - 240,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(59, 130, 246, 0.12) 40%, transparent 75%)',
          filter: 'blur(8px)',
          mixBlendMode: 'overlay'
        }}
      />
      {children}
    </div>
  );
};
