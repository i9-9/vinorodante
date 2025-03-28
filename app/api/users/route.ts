import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Buscar usuario existente o crear uno nuevo
    const user = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: { email, name }
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error processing user' },
      { status: 500 }
    );
  }
} 