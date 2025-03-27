'use client';
import { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  frequency: string;
}

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Club Básico',
      price: 45,
      quantity: 1,
      frequency: 'mes'
    }
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4 p-4 bg-white rounded-lg">
              <div>
                <h3 className="font-medium text-[#A83935]">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price}/{item.frequency}</p>
              </div>
              <div className="flex items-center">
                <button 
                  className="text-[#A83935] hover:text-[#5B0E2D] px-2"
                  onClick={() => {
                    setCartItems(items =>
                      items.map(i =>
                        i.id === item.id && i.quantity > 1
                          ? { ...i, quantity: i.quantity - 1 }
                          : i
                      )
                    );
                  }}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button 
                  className="text-[#A83935] hover:text-[#5B0E2D] px-2"
                  onClick={() => {
                    setCartItems(items =>
                      items.map(i =>
                        i.id === item.id
                          ? { ...i, quantity: i.quantity + 1 }
                          : i
                      )
                    );
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#A83935]">
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-[#A83935]">Subtotal</span>
              <span className="text-[#A83935]">${total}</span>
            </div>
          </div>
          <button 
            className="w-full bg-[#A83935] text-white py-3 rounded-lg hover:bg-[#5B0E2D] transition-colors"
            onClick={() => window.location.href = '/checkout'}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
} 