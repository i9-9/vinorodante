import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  return new Response('Orders API temporarily disabled', { status: 503 });
}

export async function POST() {
  return new Response('Order creation temporarily disabled', { status: 503 });
}

// Comentamos todo el código original y dejamos solo una respuesta temporal
/*
// Código original comentado
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, items, total } = body;
    // ... resto del código original
  } catch (error) {
    return new Response('Error creating order', { status: 500 });
  }
}
*/

// Respuesta temporal
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, items, total } = body;

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: true
      }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Error creating order' },
      { status: 500 }
    );
  }
} 