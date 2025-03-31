'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '../store/cartStore';
import { useState } from 'react';
import { Button } from '@/components/Button';

type CheckoutStep = 'review' | 'contact' | 'shipping' | 'payment';

// Costos de envío por zona
const SHIPPING_COSTS = {
  'CABA': 2000,
  'GBA Norte': 2500,
  'GBA Sur': 2500,
  'GBA Oeste': 2500,
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cart, total: subtotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('review');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    zone: 'CABA' as keyof typeof SHIPPING_COSTS,
    zipCode: '',
  });

  const shippingCost = SHIPPING_COSTS[formData.zone];
  const total = subtotal + shippingCost;

  const handleNextStep = () => {
    if (currentStep === 'review') setCurrentStep('contact');
    else if (currentStep === 'contact') setCurrentStep('shipping');
    else if (currentStep === 'shipping') setCurrentStep('payment');
  };

  const handlePrevStep = () => {
    if (currentStep === 'contact') setCurrentStep('review');
    else if (currentStep === 'shipping') setCurrentStep('contact');
    else if (currentStep === 'payment') setCurrentStep('shipping');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep !== 'payment') {
      handleNextStep();
      return;
    }

    // Aquí irá la integración con MercadoPago
    alert('Próximamente: Integración con MercadoPago');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#D4C1A1] flex items-center justify-center p-4">
        <div className="bg-[#D9D3C8] p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-pinot text-[#A83935] uppercase mb-4">
            CARRITO VACÍO
          </h1>
          <p className="text-[#5B0E2D] mb-6">
            No hay productos en tu carrito.
          </p>
          <Button
            variant="primary"
            onClick={() => router.push('/')}
            className="w-full font-pinot uppercase"
          >
            VOLVER A LA TIENDA
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D4C1A1] p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-[#D9D3C8] p-6 md:p-8 rounded-lg shadow-lg">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {['REVISAR PEDIDO', 'DATOS DE CONTACTO', 'ENVÍO', 'PAGO'].map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index === (['review', 'contact', 'shipping', 'payment'].indexOf(currentStep)) 
                  ? 'bg-[#A83935] text-white' 
                  : 'bg-[#D4C1A1] text-[#5B0E2D]'
              }`}>
                {index + 1}
              </div>
              <span className="ml-2 font-pinot text-[#5B0E2D] uppercase hidden md:block">
                {step}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 'review' && (
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-pinot text-[#5B0E2D] uppercase mb-4">
                TU PEDIDO
              </h2>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-3 text-[#5B0E2D]">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm ml-2">x {item.quantity}</span>
                  </div>
                  <span className="font-medium">${item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t border-[#D4C1A1] mt-4 pt-4">
                <div className="flex justify-between items-center text-[#5B0E2D]">
                  <span className="font-pinot uppercase">SUBTOTAL:</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between items-center text-[#5B0E2D] mt-2">
                  <span className="font-pinot uppercase">ENVÍO:</span>
                  <span>${shippingCost}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-[#5B0E2D] mt-2 text-lg">
                  <span className="font-pinot uppercase">TOTAL:</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'contact' && (
            <div className="bg-white p-6 rounded-lg space-y-4">
              <h2 className="text-xl font-pinot text-[#5B0E2D] uppercase mb-4">
                INFORMACIÓN DE CONTACTO
              </h2>
              
              <div>
                <label htmlFor="name" className="block text-[#5B0E2D] mb-2 font-medium">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full p-3 border border-[#D4C1A1] rounded bg-white focus:outline-none focus:border-[#A83935] text-[#5B0E2D]"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#5B0E2D] mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full p-3 border border-[#D4C1A1] rounded bg-white focus:outline-none focus:border-[#A83935] text-[#5B0E2D]"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-[#5B0E2D] mb-2 font-medium">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="w-full p-3 border border-[#D4C1A1] rounded bg-white focus:outline-none focus:border-[#A83935] text-[#5B0E2D]"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          )}

          {currentStep === 'shipping' && (
            <div className="bg-white p-6 rounded-lg space-y-4">
              <h2 className="text-xl font-pinot text-[#5B0E2D] uppercase mb-4">
                DATOS DE ENVÍO
              </h2>
              
              <div>
                <label htmlFor="address" className="block text-[#5B0E2D] mb-2 font-medium">
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  required
                  placeholder="Calle y número"
                  className="w-full p-3 border border-[#D4C1A1] rounded bg-white focus:outline-none focus:border-[#A83935] text-[#5B0E2D]"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="apartment" className="block text-[#5B0E2D] mb-2 font-medium">
                  Piso y Departamento (opcional)
                </label>
                <input
                  type="text"
                  id="apartment"
                  className="w-full p-3 border border-[#D4C1A1] rounded bg-white focus:outline-none focus:border-[#A83935] text-[#5B0E2D]"
                  value={formData.apartment}
                  onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="zone" className="block text-[#5B0E2D] mb-2 font-medium">
                  Zona
                </label>
                <select
                  id="zone"
                  required
                  className="w-full p-3 border border-[#D4C1A1] rounded bg-white focus:outline-none focus:border-[#A83935] text-[#5B0E2D]"
                  value={formData.zone}
                  onChange={(e) => setFormData({ ...formData, zone: e.target.value as keyof typeof SHIPPING_COSTS })}
                >
                  {Object.entries(SHIPPING_COSTS).map(([zone, cost]) => (
                    <option key={zone} value={zone}>
                      {zone} - ${cost}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="city" className="block text-[#5B0E2D] mb-2 font-medium">
                  Ciudad
                </label>
                <input
                  type="text"
                  id="city"
                  required
                  className="w-full p-3 border border-[#D4C1A1] rounded bg-white focus:outline-none focus:border-[#A83935] text-[#5B0E2D]"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-[#5B0E2D] mb-2 font-medium">
                  Código Postal
                </label>
                <input
                  type="text"
                  id="zipCode"
                  required
                  className="w-full p-3 border border-[#D4C1A1] rounded bg-white focus:outline-none focus:border-[#A83935] text-[#5B0E2D]"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                />
              </div>
            </div>
          )}

          {currentStep === 'payment' && (
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-pinot text-[#5B0E2D] uppercase mb-4">
                MÉTODO DE PAGO
              </h2>
              <p className="text-[#5B0E2D] mb-4">
                Próximamente: Integración con MercadoPago
              </p>
            </div>
          )}

          <div className="flex justify-between gap-4">
            {currentStep !== 'review' && (
              <Button
                variant="secondary"
                onClick={handlePrevStep}
                className="w-full font-pinot uppercase"
                type="button"
              >
                VOLVER
              </Button>
            )}
            <Button
              variant="primary"
              type="submit"
              className="w-full font-pinot uppercase"
            >
              {currentStep === 'payment' ? 'PAGAR' : 'CONTINUAR'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 