import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ 
  variant = 'primary', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-pinot uppercase transition-all duration-300';
  
  const variantStyles = {
    primary: 'bg-[#A83935] text-[#D4C1A1] hover:bg-[#5B0E2D]',
    secondary: 'bg-transparent border-2 border-[#D4C1A1] text-[#D4C1A1] hover:bg-[#D4C1A1] hover:text-[#A83935]'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 