import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  to, 
  onClick, 
  variant = 'primary', 
  className = '', 
  type = 'button',
  disabled = false
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-base font-bold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 uppercase tracking-wide";
  
  const variants = {
    primary: "border-transparent text-white bg-orange-600 hover:bg-orange-500 focus:ring-orange-500 shadow-lg shadow-orange-900/20",
    secondary: "border-transparent text-orange-500 bg-slate-800 hover:bg-slate-700 focus:ring-orange-500",
    outline: "border-slate-600 text-slate-300 bg-transparent hover:border-orange-500 hover:text-orange-500 focus:ring-orange-500",
    danger: "border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
    ghost: "border-transparent text-slate-400 hover:text-white hover:bg-slate-800/50"
  };

  const disabledStyles = "opacity-50 cursor-not-allowed grayscale";

  const finalClassName = `${baseStyles} ${variants[variant]} ${disabled ? disabledStyles : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={finalClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      className={finalClassName} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;