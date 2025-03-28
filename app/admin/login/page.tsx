'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#D4C1A1] flex items-center justify-center">
      <div className="bg-[#D9D3C8] p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-pinot text-[#A83935] uppercase mb-4">
          Panel Administrativo
        </h1>
        <p className="text-[#5B0E2D]">
          El panel administrativo estará disponible próximamente.
        </p>
      </div>
    </div>
  );
} 