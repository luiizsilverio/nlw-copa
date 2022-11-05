import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';

import { poolRoutes } from './routes/pool';
import { userRoutes } from './routes/user';
import { guessRoutes } from './routes/guess';
import { authRoutes } from './routes/auth';
import { gameRoutes } from './routes/game';

async function start() {

  const fastify = Fastify({
    logger: false, /* geração de logs */
  })

  await fastify.register(cors, {
    origin: true,
  })

  await fastify.register(jwt, {
    secret: "nlwcopa"
  })

  await fastify.register(poolRoutes);

  await fastify.register(authRoutes);

  await fastify.register(gameRoutes);
  
  await fastify.register(guessRoutes);  
  
  await fastify.register(userRoutes);

  await fastify.listen({ port: 3333, host: '0.0.0.0' }, () => {
    console.log('Rodando NLW-Copa na porta 3333');
  });
}

start();
