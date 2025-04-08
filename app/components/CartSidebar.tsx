'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '../store/cartStore';
import { Button } from './Button';

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items: cartItems, total, removeItem, updateQuantity } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    onClose(); // Cerramos el sidebar
    window.location.href = '/checkout';
  };

  return (
    <>
      {/* Overlay de fondo */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-[#D4C1A1] shadow-lg transform transition-transform duration-300 ease-in-out h-screen z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-pinot text-[#5B0E2D] uppercase">CARRITO</h2>
            <button 
              onClick={onClose}
              className="text-[#5B0E2D] hover:text-[#A83935]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-[#5B0E2D] text-lg">Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="mb-4 bg-[#D9D3C8] p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[#5B0E2D] font-medium">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#A83935] hover:text-[#5B0E2D]"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="text-[#A83935] hover:text-[#5B0E2D]"
                        >
                          -
                        </button>
                        <span className="text-[#5B0E2D]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-[#A83935] hover:text-[#5B0E2D]"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[#5B0E2D] font-medium">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#5B0E2D] pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#5B0E2D] font-medium font-pinot uppercase">TOTAL:</span>
                  <span className="text-[#5B0E2D] font-medium">${total}</span>
                </div>
                <Button 
                  variant="primary"
                  onClick={handleCheckout}
                  className="w-full font-pinot uppercase"
                >
                  FINALIZAR COMPRA
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
} 