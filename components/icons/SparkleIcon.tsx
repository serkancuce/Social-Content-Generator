
import React from 'react';

export const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-7.19c0-1.76-1.44-3.21-3.21-3.21H1.5a.75.75 0 01-.75-.75c0-4.69 2.056-9.19 5.815-12.436a.75.75 0 011.06.064z"
      clipRule="evenodd"
    />
  </svg>
);
