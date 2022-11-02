import Fastify from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import ShortUniqueId from 'short-unique-id';

const prisma = new PrismaClient({
  log: ['query'],
})


async function start() {
  const fastify = Fastify({
    logger: true, /* geração de logs */
  })

  await fastify.register(cors, {
    origin: true,
  })

  // ROTAS -----
  
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count();
    return { count }
  })

  fastify.get('/users/count', async () => {
    const count = await prisma.user.count();
    return { count }
  })

  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count();
    return { count }
  })

  fastify.post('/pools', async (request, response) => {
    const createBody = z.object({
      title: z.string(), //.nullable()
    })

    const { title } = createBody.parse(request.body);

    const generate = new ShortUniqueId({ length: 6 });
    const code = generate().toUpperCase();

    await prisma.pool.create({
      data: {
        title,
        code
      }
    })

    return response.status(201).send({ code });
  })

  await fastify.listen({ port: 3333, /*host: '0.0.0.0'*/ });
}

start();
