import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Limpiar la base de datos primero
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  // Crear usuario admin primero
  const hashedPassword = await bcrypt.hash('admin123', 10)

  await prisma.user.create({
    data: {
      email: 'admin@vinorodante.com',
      password: hashedPassword,
      name: 'Admin',
      phone: '1234567890',
      address: 'Admin Address',
      isAdmin: true
    }
  })

  // Luego crear productos
  const products = [
    {
      name: 'Club Básico',
      description: '2 botellas mensuales de vino natural seleccionado',
      price: 45.00,
      image: '/products/basic.jpg',
      stock: 100,
      frequency: 'monthly'
    },
    {
      name: 'Club Premium',
      description: '4 botellas mensuales de vino natural premium',
      price: 85.00,
      image: '/products/premium.jpg',
      stock: 50,
      frequency: 'monthly'
    },
    {
      name: 'Club Exclusivo',
      description: '3 botellas de edición limitada cada trimestre',
      price: 120.00,
      image: '/products/exclusive.jpg',
      stock: 30,
      frequency: 'quarterly'
    },
    {
      name: 'Club Descubrimiento',
      description: '6 botellas variadas cada semestre',
      price: 200.00,
      image: '/products/discovery.jpg',
      stock: 20,
      frequency: 'biannual'
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