import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function main() {
  try {
    console.log('Intentando conectar a la base de datos...')
    const users = await prisma.user.findMany()
    console.log('Conexión exitosa! Usuarios encontrados:', users.length)
  } catch (error) {
    console.error('Error de conexión:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 