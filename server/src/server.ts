import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
})


async function start() {
  const fastify = Fastify({
    logger: true, /* geração de logs */
  })

  // Rotas
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count();

    return { count }
  })


  await fastify.listen({ port: 3333 });
}

start();
