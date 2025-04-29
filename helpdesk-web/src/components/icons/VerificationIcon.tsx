import React from 'react';

interface VerificationIconProps {
  className?: string;
}

const VerificationIcon: React.FC<VerificationIconProps> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
      <path d="M7 12l2 2 8-8" />
    </svg>
  );
};

export default VerificationIcon;
