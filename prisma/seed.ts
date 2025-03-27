import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const products = [
    {
      name: 'Club Básico',
      description: '2 botellas mensuales de vino natural seleccionado',
      price: 45.00,
      image: '/products/basic.jpg',
      stock: 100,
      interval: 'monthly'
    },
    {
      name: 'Club Premium',
      description: '4 botellas mensuales de vino natural premium',
      price: 85.00,
      image: '/products/premium.jpg',
      stock: 50,
      interval: 'monthly'
    },
    {
      name: 'Club Exclusivo',
      description: '3 botellas de edición limitada cada trimestre',
      price: 120.00,
      image: '/products/exclusive.jpg',
      stock: 30,
      interval: 'quarterly'
    },
    {
      name: 'Club Descubrimiento',
      description: '6 botellas variadas cada semestre',
      price: 200.00,
      image: '/products/discovery.jpg',
      stock: 20,
      interval: 'biannual'
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 