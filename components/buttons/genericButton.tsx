import React, { ReactNode } from 'react';

interface GenericButtonProps {
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function GenericButton({
  onClick,
  children,
  disabled = false,
  className = '',
  type = 'button'
}: GenericButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center space-x-2 rounded-lg bg-teal-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-500 focus:ring-opacity-25 active:bg-teal-600 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
