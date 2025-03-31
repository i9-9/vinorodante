export async function POST() {
  return new Response('Authentication temporarily disabled', { status: 503 });
} 