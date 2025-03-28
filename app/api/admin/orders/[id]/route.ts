/*
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status } = body;

    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status }
    });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating order' },
      { status: 500 }
    );
  }
}
*/

// Placeholder response
export async function PATCH() {
  return new Response('Order update temporarily disabled', { status: 503 });
} 