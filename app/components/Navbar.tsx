'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define props for the Navbar
interface NavbarProps {
  onCartClick: () => void; // Function to open the cart
}

// Receive the onCartClick prop
export default function Navbar({ onCartClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#D4C1A1] z-50">
      <div className="mx-10 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo/logo_vr.svg" 
              alt="Vino Rodante Logo" 
              width={48}
              height={48}
              className="h-12 w-auto"
              quality={100}
              priority
            />
          </Link>

          <div className="flex items-center gap-6">
            {/* Cart Icon */}
            <button
              onClick={onCartClick}
              className="text-[#A83935]"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center px-4 py-2 text-[#A83935] transition-colors"
            >
              <span className="font-pinot text-xl uppercase">
                {isMenuOpen ? 'CERRAR' : 'MENU'}
              </span>
            </button>
          </div>
        </div>

        {/* Menu (mobile & desktop) */}
        <div 
          className={`
            transform transition-all duration-300 ease-in-out
            ${isMenuOpen 
              ? 'opacity-100 translate-y-0 max-h-[500px]' 
              : 'opacity-0 -translate-y-4 max-h-0 overflow-hidden'
            }
          `}
        >
          <div className="mt-8 pt-4 border-t border-[#A83935]">
            <div className="flex flex-col gap-4">
              <a 
                href="#inicio" 
                className="font-medium text-[#A83935] text-base transform transition-transform duration-200 hover:translate-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </a>
              <a 
                href="#explorar" 
                className="font-medium text-[#A83935] text-base transform transition-transform duration-200 hover:translate-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Explorar
              </a>
              <a 
                href="#nosotros" 
                className="font-medium text-[#A83935] text-base transform transition-transform duration-200 hover:translate-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 