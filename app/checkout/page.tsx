'use client';
import { useState } from 'react';
import Link from 'next/link';

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <main className="bg-[#D4C1A1] min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center mb-8">
          <Link href="/" className="text-[#A83935] hover:text-[#5B0E2D]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold text-[#A83935] ml-4 font-pinot uppercase">Checkout</h1>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className={`flex items-center ${step >= 1 ? 'text-[#A83935]' : 'text-gray-400'}`}>
              <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2 ${step >= 1 ? 'border-[#A83935]' : 'border-gray-400'}`}>
                1
              </span>
              <span>Carrito</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-[#A83935]' : 'bg-gray-300'}`} />
            <div className={`flex items-center ${step >= 2 ? 'text-[#A83935]' : 'text-gray-400'}`}>
              <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2 ${step >= 2 ? 'border-[#A83935]' : 'border-gray-400'}`}>
                2
              </span>
              <span>Envío</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-[#A83935]' : 'bg-gray-300'}`} />
            <div className={`flex items-center ${step >= 3 ? 'text-[#A83935]' : 'text-gray-400'}`}>
              <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2 ${step >= 3 ? 'border-[#A83935]' : 'border-gray-400'}`}>
                3
              </span>
              <span>Pago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-pinot text-[#A83935] uppercase mb-6">Tu Carrito</h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center">
                    <div className="w-20 h-20 bg-[#F4A6C0] rounded-lg mr-4"></div>
                    <div>
                      <h3 className="font-medium text-[#5B0E2D]">Club Básico</h3>
                      <p className="text-sm text-gray-500">Suscripción Mensual</p>
                    </div>
                  </div>
                  <div className="text-[#5B0E2D] font-medium">$45.00</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-[#5B0E2D]">Total: $45.00</p>
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

          {step === 2 && (
            <form onSubmit={handleShippingSubmit}>
              <h2 className="text-2xl font-pinot text-[#A83935] uppercase mb-6">Información de Envío</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#5B0E2D] mb-2">Nombre</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                    value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[#5B0E2D] mb-2">Apellido</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[#5B0E2D] mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[#5B0E2D] mb-2">Teléfono</label>
                  <input
                    type="tel"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[#5B0E2D] mb-2">Dirección</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[#5B0E2D] mb-2">Ciudad</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[#5B0E2D] mb-2">Provincia</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[#5B0E2D] mb-2">Código Postal</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                    value={shippingInfo.zipCode}
                    onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button 
                  type="submit"
                  className="bg-[#A83935] text-white px-6 py-2 rounded-lg hover:bg-[#5B0E2D] transition-colors"
                >
                  Continuar al Pago
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-pinot text-[#A83935] uppercase mb-6">Método de Pago</h2>
              <div className="space-y-4">
                <div className="border rounded p-4">
                  <h3 className="font-medium text-[#5B0E2D] mb-2">Mercado Pago</h3>
                  <button 
                    className="bg-[#A83935] text-white px-6 py-2 rounded-lg hover:bg-[#5B0E2D] transition-colors w-full"
                    onClick={() => {
                      // Implement payment logic
                      alert('Redirigiendo a Mercado Pago...');
                    }}
                  >
                    Pagar con Mercado Pago
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 