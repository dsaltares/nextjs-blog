import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createUser = async (name: string, email: string) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  })
  return user
}

export const deleteUser = async (email: string) => {
  await prisma.user.delete({
    where: {
      email,
    },
  })
}
