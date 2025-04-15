const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@supabase/supabase-js');

async function testPrismaConnection() {
  const prisma = new PrismaClient();
  try {
    console.log('Testing Prisma connection...');
    const users = await prisma.user.findMany();
    console.log('✅ Prisma connection successful!');
    console.log(`Found ${users.length} users in the database.`);
  } catch (error) {
    console.error('❌ Prisma connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function testSupabaseConnection() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Supabase environment variables are missing');
    return;
  }

  try {
    console.log('Testing Supabase connection...');
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .schema('public')
      .from('users')
      .select('*')
      .limit(1);
    
    if (error) throw error;
    
    console.log('✅ Supabase connection successful!');
    console.log(`Found ${data?.length || 0} users in Supabase.`);
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
  }
}

async function main() {
  console.log('Starting connection tests...\n');
  await testPrismaConnection();
  console.log('\n');
  await testSupabaseConnection();
}

main()
  .catch(console.error)
  .finally(() => process.exit()); 