const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Checking database connection...');
    
    // Test the connection
    await prisma.$connect();
    console.log('Database connection successful!');
    
    // List all products
    const products = await prisma.product.findMany();
    console.log('\nProducts in database:');
    console.log(products.length > 0 ? products : 'No products found');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 