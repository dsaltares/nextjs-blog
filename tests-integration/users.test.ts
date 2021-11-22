import { PrismaClient } from '@prisma/client'
import { createUser, deleteUser } from '../lib/users'

const prisma = new PrismaClient()

beforeEach(async () => {
  await prisma.user.deleteMany()
})

describe('createUser', () => {
  it('creates user', async () => {
    const user = await createUser('Ada Lovelaces', 'ada.lovelace@ada.dev')
    expect(user).toEqual({
      name: 'Ada Lovelaces',
      email: 'ada.lovelace@ada.dev',
      id: expect.any(Number),
    })
    const count = await prisma.user.count()
    expect(count).toBe(1)

    const dbUser = await prisma.user.findFirst()
    expect(dbUser).toEqual(user)
  })

  it('throws when creating duplicated user', async () => {
    await prisma.user.create({
      data: {
        name: 'test',
        email: 'ada.lovelace@ada.dev',
      },
    })

    await expect(() =>
      createUser('Ada Lovelaces', 'ada.lovelace@ada.dev')
    ).rejects.toBeInstanceOf(Error)
  })
})

describe('deleteUser', () => {
  it('deletes user', async () => {
    await prisma.user.create({
      data: {
        name: 'test',
        email: 'ada.lovelace@ada.dev',
      },
    })

    await deleteUser('ada.lovelace@ada.dev')

    const count = await prisma.user.count()
    expect(count).toBe(0)
  })

  it('throws when deleting non existing user', async () => {
    await expect(() => deleteUser('yolo')).rejects.toBeInstanceOf(Error)
  })
})
