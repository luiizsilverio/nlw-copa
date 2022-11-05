import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod';
import ShortUniqueId from 'short-unique-id';
import { authenticate } from "../plugins/authenticate";

export async function poolRoutes(fastify: FastifyInstance) {

  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count();
    return { count }
  })


  fastify.post('/pools', async (request, response) => {
    const createBody = z.object({
      title: z.string(), //.nullable()
    })

    const { title } = createBody.parse(request.body);

    const generate = new ShortUniqueId({ length: 6 });
    const code = generate().toUpperCase();

    try {
      await request.jwtVerify();

      await prisma.pool.create({
        data: {
          title,
          code,
          ownerId: request.user.sub,

          participants: {
            create: {
              userId: request.user.sub
            }
          }
        }
      })

    } catch (err) {
      
      await prisma.pool.create({
        data: {
          title,
          code
        }
      })
    }


    return response.status(201).send({ code });
  })


  fastify.post('/pools/join', 
    {
      onRequest: [authenticate]
    },
    async (request, response) => {
      
      const poolBody = z.object({
        code: z.string(),
      })

      const { code } = poolBody.parse(request.body);

      const pool = await prisma.pool.findUnique({
        where: {
          code,          
        },
        include: {
          participants: {
            where: {
              userId: request.user.sub,
            }
          }
        }
      })

      if (!pool) {
        return response.status(400).send({
          message: 'Bolão não encontrado'
        })
      }

      if (pool.participants.length > 0) {
        return response.status(400).send({
          message: 'Você já está nesse bolão'
        })
      }

      if (!pool.ownerId) {
        await prisma.pool.update({
          where: {
            id: pool.id,
          },
          data: {
            ownerId: request.user.sub,
          }
        })
      }

      await prisma.participant.create({
        data: {
          poolId: pool.id,
          userId: request.user.sub,
        }
      })

      return response.status(201).send();
    }
  )


  fastify.get('/pools', 
    {
      onRequest: [authenticate]
    },
    async (request) => {

      // encontra os bolões de que o usuário faz parte (some)
      const pools = await prisma.pool.findMany({
        where: {
          participants: {
            some: {
              userId: request.user.sub,
            }
          }
        },
        include: {
          _count: {
            select: {
              participants: true,
            }
          },
          owner: {
            select: {
              id: true,
              name: true,
            }
          },
          participants: {
            select: {
              id: true,    
              
              user: {
                select: {
                  avatarUrl: true,
                }
              }
            },
            take: 4,
          }
        }
      })


      return { pools }      
    }
  )


  fastify.get('/pools/:id', 
    {
      onRequest: [authenticate]
    },
    async (request) => {
    
      const poolParams = z.object({
        id: z.string(),
      })

      const { id } = poolParams.parse(request.params);

      const pool = await prisma.pool.findUnique({
        where: {
          id,
        },
        include: {
          _count: {
            select: {
              participants: true,
            }
          },
          owner: {
            select: {
              id: true,
              name: true,
            }
          },
          participants: {
            select: {
              id: true,    
              
              user: {
                select: {
                  avatarUrl: true,
                }
              }
            },
            take: 4,
          }
        }
      })

      return { pool }
    }
  )


}