'use client';

import { useCart } from '../store/cartStore';

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items: cartItems, total, removeItem, updateQuantity } = useCart();

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-[#D4C1A1] shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#A83935]">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-pinot text-[#A83935] uppercase">Carrito</h2>
            <button 
              onClick={onClose}
              className="text-[#A83935] hover:text-[#5B0E2D]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
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
                    <p className="text-sm text-[#5B0E2D]">${item.price} / {item.frequency}</p>
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

        {/* Footer */}
        <div className="p-4 border-t border-[#A83935]">
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-[#A83935]">Total</span>
              <span className="text-[#A83935]">${total}</span>
            </div>
          </div>
          <button 
            className="w-full bg-[#A83935] text-white py-3 rounded-lg hover:bg-[#5B0E2D] transition-colors"
            onClick={() => window.location.href = '/checkout'}
            disabled={cartItems.length === 0}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
} 