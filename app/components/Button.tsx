import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md text-lg font-medium";
  
  const variants = {
    primary: "bg-[#A83935] text-[#D4C1A1] hover:bg-[#5B0E2D]",
    secondary: "bg-[#D4C1A1] text-[#5B0E2D] hover:bg-[#E3C16F]"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 