'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Checkout() {
  const [step, setStep] = useState(1);

  return (
    <main className="bg-[#D4C1A1] min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center mb-8">
          <Link href="/" className="text-[#A83935] hover:text-[#5B0E2D]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold text-[#A83935] ml-4">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className={`flex items-center ${step >= 1 ? 'text-[#A83935]' : 'text-gray-400'}`}>
              <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2">
                1
              </span>
              <span>Carrito</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-[#A83935]' : 'bg-gray-300'}`} />
            <div className={`flex items-center ${step >= 2 ? 'text-[#A83935]' : 'text-gray-400'}`}>
              <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2">
                2
              </span>
              <span>Envío</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-[#A83935]' : 'bg-gray-300'}`} />
            <div className={`flex items-center ${step >= 3 ? 'text-[#A83935]' : 'text-gray-400'}`}>
              <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2">
                3
              </span>
              <span>Pago</span>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl mb-4">Tu Carrito</h2>
            <div className="space-y-4">
              {/* Sample Cart Item */}
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center">
                  <div className="w-20 h-20 bg-[#F99B79] rounded-lg mr-4"></div>
                  <div>
                    <h3 className="font-medium">Club Básico</h3>
                    <p className="text-sm text-gray-500">Suscripción Mensual</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="text-[#A83935] px-2">-</button>
                  <span className="mx-2">1</span>
                  <button className="text-[#A83935] px-2">+</button>
                  <span className="ml-4 font-medium">$45.00</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div>
                <p className="text-lg font-medium">Total: $45.00</p>
                <p className="text-sm text-gray-500">Impuestos incluidos</p>
              </div>
              <button 
                onClick={() => setStep(2)}
                className="bg-[#A83935] text-white px-6 py-2 rounded-lg hover:bg-[#5B0E2D] transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 