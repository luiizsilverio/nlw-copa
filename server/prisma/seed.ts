import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Zé das Couves',
      email: 'z.couves@gmail.com',
      avatarUrl: 'https://github.com/diego3g.png',
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Bolão do Bar do Zé',
      code: 'BOLZE123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  // const participant = await prisma.participant.create({
  //   data: {
  //     poolId: pool.id,
  //     userId: user.id
  //   }
  // })

  await prisma.game.create({
    data: {
      date: '2022-11-02T16:28:05.952Z',
      Team1CountryCode: 'DE',
      Team2CountryCode: 'BR',
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-01T19:00:00.952Z',
      Team1CountryCode: 'BR',
      Team2CountryCode: 'AR',

      guesses: {
        create: {
          team1Points: 2,
          team2Points: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })

}

main();