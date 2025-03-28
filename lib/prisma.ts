import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = null;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 