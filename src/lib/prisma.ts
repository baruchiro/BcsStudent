import { PrismaClient } from '@prisma/client'

// Define a type for the global object with our prisma property
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Use existing client if it exists, otherwise create new one
export const prisma = globalForPrisma.prisma || new PrismaClient()

// In development, save the client to global to prevent multiple instances
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
