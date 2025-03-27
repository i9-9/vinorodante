'use client';

import Image from 'next/image';

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#D4C1A1]">
      <Image 
        src="/logo/logo2.svg" 
        alt="Loading..." 
        width={96}
        height={96}
        className="animate-spin-y"
      />
    </div>
  );
} 