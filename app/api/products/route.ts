import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    { message: 'API temporarily disabled' },
    { status: 503 }
  )
}

export async function POST() {
  return NextResponse.json(
    { message: 'API temporarily disabled' },
    { status: 503 }
  )
} 