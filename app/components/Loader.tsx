'use client';

import Image from 'next/image';

export default function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D4C1A1]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-[#A83935] border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg className="w-8 h-8 text-[#A83935]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2V22M12 2L8 6M12 2L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
} 