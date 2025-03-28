'use client';

import { useCart } from '../store/cartStore';
import { Button } from './Button';

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items: cartItems, total, removeItem, updateQuantity } = useCart();

  const handleCheckout = () => {
    // Por ahora solo mostraremos un mensaje
    alert('Funcionalidad de checkout en desarrollo');
    onClose();
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
        <div className="flex flex-col h-full">
          {/* Header con título y botón de cerrar */}
          <div className="p-4 border-b border-[#A83935] flex justify-between items-center">
            <h2 className="text-2xl font-pinot text-[#A83935] uppercase">Carrito</h2>
            <button 
              onClick={onClose}
              className="text-[#A83935] hover:text-[#5B0E2D] transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Contenido del carrito */}
          <div className="flex-1 overflow-y-auto py-4 px-4">
            {cartItems.length === 0 ? (
              <p className="text-center text-[#5B0E2D]">Tu carrito está vacío</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between bg-[#D9D3C8] p-4 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-[#5B0E2D]">{item.name}</h3>
                      <p className="text-sm text-[#5B0E2D]">${item.price}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-[#A83935] hover:text-[#5B0E2D]"
                        >-</button>
                        <span className="mx-2 text-[#5B0E2D]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-[#A83935] hover:text-[#5B0E2D]"
                        >+</button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#A83935] hover:text-[#5B0E2D]"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer con total y botón de checkout */}
          <div className="border-t border-[#A83935] p-4">
            <div className="mb-4">
              <div className="flex justify-between text-[#A83935] text-lg font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
            <Button 
              variant="primary" 
              className="w-full"
              onClick={handleCheckout}
            >
              Finalizar Compra
            </Button>
          </div>
        </div>
      </div>
    </>
  );
} 