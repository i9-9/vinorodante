import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    // Debug de variables de entorno
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    
    if (!request.body) {
      return NextResponse.json({ error: 'No se recibieron datos' }, { status: 400 });
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña son requeridos' }, { status: 400 });
    }

    console.log('Intento de login:', { email });

    // Intenta una query simple primero
    try {
      const userCount = await prisma.$queryRaw`SELECT COUNT(*) FROM "User"`;
      console.log('Users in database:', userCount);
    } catch (dbError) {
      console.error('Database connection error:', dbError);
    }

    const admin = await prisma.user.findFirst({
      where: {
        email,
        isAdmin: true
      }
    });

    if (!admin) {
      console.log('Admin no encontrado');
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      console.log('Contraseña inválida');
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    // Si llegamos aquí, las credenciales son válidas
    const cookieStore = cookies();
    cookieStore.set('admin_session', admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 horas
    });

    return NextResponse.json({ success: true });
    
  } catch (err) {
    console.error('Error completo:', err);
    return NextResponse.json(
      { error: 'Error en el servidor', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 