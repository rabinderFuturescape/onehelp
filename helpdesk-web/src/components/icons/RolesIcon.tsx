import React from 'react';

interface RolesIconProps {
  className?: string;
}

const RolesIcon: React.FC<RolesIconProps> = ({ className }) => {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M19 12h2a2 2 0 0 1 2 2v2" />
      <path d="M13 17h2a2 2 0 0 1 2 2v2" />
    </svg>
  );
};

export default RolesIcon;
