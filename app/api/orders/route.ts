import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { message: 'Orders API temporarily disabled' },
    { status: 503 }
  );
}

// Orders API temporarily disabled
export async function POST(): Promise<NextResponse> {
  return NextResponse.json(
    { message: 'Order creation temporarily disabled' },
    { status: 503 }
  );
}

// Original implementation (commented for future reference)
/*
import { prisma } from '@/lib/prisma';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { userId, items, total } = body;
    // ... resto del código original
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating order' },
      { status: 500 }
    );
  }
}
*/ 