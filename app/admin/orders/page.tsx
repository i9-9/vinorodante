'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';

interface Order {
  id: string;
  user: {
    name: string;
    email: string;
  };
  total: number;
  status: string;
  createdAt: string;
  items: Array<{
    product: {
      name: string;
    };
    quantity: number;
    price: number;
  }>;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchOrders(); // Recargar órdenes
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-pinot text-[#A83935] uppercase mb-8">Órdenes</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-[#D9D3C8] p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-medium text-[#5B0E2D]">Orden #{order.id.slice(0, 8)}</h2>
                <p className="text-sm text-[#5B0E2D]">{order.user.name} - {order.user.email}</p>
                <p className="text-sm text-[#5B0E2D]">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={order.status === 'pending' ? 'primary' : 'secondary'}
                  onClick={() => updateOrderStatus(order.id, 'completed')}
                >
                  {order.status === 'pending' ? 'Completar' : 'Completada'}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-[#5B0E2D]">
                  <span>{item.product.name} x{item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#A83935] mt-4 pt-4">
              <div className="flex justify-between font-bold text-[#5B0E2D]">
                <span>Total</span>
                <span>${order.total}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 