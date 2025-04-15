import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database connection error' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { email, name, password, phone, address } = body;

    if (!email || !name || !password || !phone || !address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Buscar usuario existente o crear uno nuevo
    const user = await prisma.user.upsert({
      where: { email },
      update: { name, phone, address },
      create: { 
        email, 
        name, 
        password, 
        phone, 
        address,
        isAdmin: false
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error processing user:', error);
    return NextResponse.json(
      { error: 'Error processing user' },
      { status: 500 }
    );
  }
} 