'use client';

import { useEffect, useState } from 'react';
import AdminProtected from '@/components/AdminProtected';

interface Order {
  id: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    zone: string;
    zipCode: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data.orders))
      .catch(error => console.error('Error loading orders:', error));
  }, []);

  return (
    <AdminProtected>
      <div className="min-h-screen bg-[#D4C1A1] p-4 md:p-8">
        <div className="max-w-6xl mx-auto bg-[#D9D3C8] p-6 md:p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-pinot text-[#A83935] uppercase mb-8">
            ÓRDENES
          </h1>
          
          <div className="space-y-6">
            {orders.length === 0 ? (
              <p className="text-[#5B0E2D] text-center py-8">No hay órdenes todavía.</p>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-pinot text-[#5B0E2D] uppercase">
                        ORDEN #{order.id.slice(0, 8)}
                      </h2>
                      <p className="text-[#5B0E2D]">
                        {new Date(order.createdAt).toLocaleDateString('es-AR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Información del cliente */}
                    <div>
                      <h3 className="font-pinot text-[#5B0E2D] uppercase mb-3">CLIENTE</h3>
                      <div className="space-y-2 text-[#5B0E2D]">
                        <p><span className="font-medium">Nombre:</span> {order.customerInfo.name}</p>
                        <p><span className="font-medium">Email:</span> {order.customerInfo.email}</p>
                        <p><span className="font-medium">Teléfono:</span> {order.customerInfo.phone}</p>
                      </div>
                    </div>

                    {/* Información de envío */}
                    <div>
                      <h3 className="font-pinot text-[#5B0E2D] uppercase mb-3">ENVÍO</h3>
                      <div className="space-y-2 text-[#5B0E2D]">
                        <p><span className="font-medium">Dirección:</span> {order.customerInfo.address}</p>
                        {order.customerInfo.apartment && (
                          <p><span className="font-medium">Piso/Depto:</span> {order.customerInfo.apartment}</p>
                        )}
                        <p><span className="font-medium">Ciudad:</span> {order.customerInfo.city}</p>
                        <p><span className="font-medium">Zona:</span> {order.customerInfo.zone}</p>
                        <p><span className="font-medium">CP:</span> {order.customerInfo.zipCode}</p>
                      </div>
                    </div>
                  </div>

                  {/* Productos */}
                  <div className="mt-6">
                    <h3 className="font-pinot text-[#5B0E2D] uppercase mb-3">PRODUCTOS</h3>
                    <div className="bg-[#D9D3C8] rounded-lg p-4">
                      {order.items.map(item => (
                        <div key={item.id} className="flex justify-between items-center mb-2 text-[#5B0E2D]">
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <span className="text-sm ml-2">x {item.quantity}</span>
                          </div>
                          <span>${item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="border-t border-[#5B0E2D] mt-4 pt-4 space-y-2">
                        <div className="flex justify-between text-[#5B0E2D]">
                          <span>Subtotal:</span>
                          <span>${order.subtotal}</span>
                        </div>
                        <div className="flex justify-between text-[#5B0E2D]">
                          <span>Envío:</span>
                          <span>${order.shippingCost}</span>
                        </div>
                        <div className="flex justify-between text-[#5B0E2D] font-bold text-lg">
                          <span className="font-pinot uppercase">TOTAL:</span>
                          <span>${order.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminProtected>
  );
} 