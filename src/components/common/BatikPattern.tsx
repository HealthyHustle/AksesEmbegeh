import React from 'react';

interface BatikPatternProps {
  className?: string;
  opacity?: number;
}

export const BatikPattern: React.FC<BatikPatternProps> = ({ className = '', opacity = 0.05 }) => {
  return (
    <div 
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} 
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="batik-motif" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* Parang & Kawung Abstract Geometric Combination */}
            <path 
              d="M0 0 L40 40 L80 0 M0 80 L40 40 L80 80 M40 0 L40 80" 
              stroke="#3B82F6" 
              strokeWidth="1.2" 
              fill="none"
              strokeDasharray="3 3"
            />
            <circle cx="40" cy="40" r="14" stroke="#0F2747" strokeWidth="1.5" fill="none" />
            <circle cx="40" cy="40" r="6" fill="#3B82F6" fillOpacity="0.4" />
            <circle cx="0" cy="0" r="10" stroke="#3B82F6" strokeWidth="1" fill="none" />
            <circle cx="80" cy="0" r="10" stroke="#3B82F6" strokeWidth="1" fill="none" />
            <circle cx="0" cy="80" r="10" stroke="#3B82F6" strokeWidth="1" fill="none" />
            <circle cx="80" cy="80" r="10" stroke="#3B82F6" strokeWidth="1" fill="none" />
            
            {/* Organic connection curves */}
            <path d="M26 40 Q40 26 54 40 Q40 54 26 40 Z" fill="#CFEAFF" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="0.8"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#batik-motif)" />
      </svg>
    </div>
  );
};
