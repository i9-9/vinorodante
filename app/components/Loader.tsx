'use client';

import React from 'react';

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#D4C1A1]">
      <img 
        src="/logo/logo2.svg" 
        alt="Loading..." 
        className="h-24 w-24 animate-spin-y"
      />
    </div>
  );
} 