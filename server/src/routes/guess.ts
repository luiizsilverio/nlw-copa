import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";


export async function guessRoutes(fastify: FastifyInstance) {

  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count();
    return { count }
  })
  
  fastify.post('/pools/:poolId/games/:gameId/guesses', 
    {
      onRequest: [authenticate]
    },
    async (request, response) => {

      const guessParams = z.object({
        poolId: z.string(),
        gameId: z.string(),
      })
      
      const guessBody = z.object({
        team1Points: z.number(),
        team2Points: z.number(),
      })
      
      const { poolId, gameId } = guessParams.parse(request.params);
      const { team1Points, team2Points } = guessBody.parse(request.body);

      const participant = await prisma.participant.findUnique({
        where: {
          userId_poolId: {
            poolId,
            userId: request.user.sub
          }
        }
      })

      if (!participant) {
        return response.status(400).send({
          message: 'Você não faz parte desse bolão'
        })
      }

      const guess = await prisma.guess.findUnique({
        where: {
          participantId_gameId: {
            participantId: participant.id,
            gameId,
          }
        }
      })

      if (guess) {
        return response.status(400).send({
          message: 'Você já deu seu palpite nesse jogo'
        })
      }

      const game = await prisma.game.findUnique({
        where: {
          id: gameId,
        }
      })

      if (!game) {
        return response.status(400).send({
          message: 'Jogo não encontrado'
        })
      }

      if (game.date < new Date()) {
        return response.status(400).send({
          message: 'Jogo já foi realizado!'
        })
      }

      await prisma.guess.create({
        data: {
          gameId,
          participantId: participant.id,
          team1Points,
          team2Points
        }
      })

      return response.status(201).send();
    }
  )
}