'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import AdminProtected from '@/components/AdminProtected';

export default function AdminPage() {
  const router = useRouter();

  return (
    <AdminProtected>
      <div className="min-h-screen bg-[#D4C1A1] p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-[#D9D3C8] p-6 md:p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-pinot text-[#A83935] uppercase">
              PANEL DE ADMINISTRACIÓN
            </h1>
            <Button
              variant="secondary"
              onClick={() => {
                localStorage.removeItem('adminAuthenticated');
                router.push('/admin/login');
              }}
              className="font-pinot uppercase"
            >
              CERRAR SESIÓN
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-pinot text-[#5B0E2D] uppercase mb-4">
                ÓRDENES
              </h2>
              <p className="text-[#5B0E2D] mb-4">
                Ver y gestionar todas las órdenes recibidas.
              </p>
              <Button
                variant="primary"
                onClick={() => router.push('/admin/orders')}
                className="w-full font-pinot uppercase"
              >
                VER ÓRDENES
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-pinot text-[#5B0E2D] uppercase mb-4">
                PRODUCTOS
              </h2>
              <p className="text-[#5B0E2D] mb-4">
                Gestionar el catálogo de productos.
              </p>
              <Button
                variant="primary"
                onClick={() => router.push('/admin/products')}
                className="w-full font-pinot uppercase"
              >
                VER PRODUCTOS
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
} 