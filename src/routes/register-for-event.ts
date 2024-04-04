import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function registerForEvent(app: FastifyInstance){
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/events/:eventId/attendees', {
      schema: {
        body: z.object({
          name: z.string().min(4),
          email: z.string().email()
        }),
        params: z.object({
          eventId: z.string().uuid()
        }),
        response: {
          201: z.object({
            attendeeId: z.number()
          })
        }
      }
    },
    async (request, reply) => {
      const { email, name} = request.body
      const { eventId } = request.params

      const attendeeFromEmail = await prisma.attendee.findUnique({
        where: {
          eventId_email: {
            email, 
            eventId
          }
        }
      })

      if(attendeeFromEmail !== null){
        throw new Error('This email is already registered for this event.')
      }

      const amountOfAttendeesForEventId = await prisma.attendee.count({
        where: {
          eventId
        }
      })

      const event = await prisma.event.findUnique({
        where: {
          id: eventId
        }
      })

      if(event?.maximumAttendees !== null && event?.maximumAttendees !== undefined && amountOfAttendeesForEventId >= event?.maximumAttendees){
        throw new Error('The maximum number of Attendees for this event has been reached.')
      }
      
      

      const attendee = await prisma.attendee.create({
        data: {
          email,
          name,
          eventId
        }
      })

      return reply.status(201).send({ attendeeId: attendee.id })
    })
}