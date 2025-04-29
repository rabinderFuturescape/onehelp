import React from 'react';

interface EscalationIconProps {
  className?: string;
}

const EscalationIcon: React.FC<EscalationIconProps> = ({ className }) => {
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
      <path d="M13 17l5-5-5-5" />
      <path d="M6 17l5-5-5-5" />
      <path d="M19 17v-2" />
      <path d="M19 10V8" />
    </svg>
  );
};

export default EscalationIcon;
