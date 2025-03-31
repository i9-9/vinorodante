export async function GET() {
  return new Response('Products API temporarily disabled', { status: 503 });
}

export async function POST() {
  return new Response('Product creation temporarily disabled', { status: 503 });
} 