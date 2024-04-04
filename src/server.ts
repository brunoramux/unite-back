import fastify from 'fastify'
import {serializerCompiler, validatorCompiler, jsonSchemaTransform} from 'fastify-type-provider-zod'
import { createEvent } from './routes/create-events'
import { registerForEvent } from './routes/register-for-event'
import { getEvent } from './routes/get-event'
import { checkIn } from './routes/check-in'
import { getEventAttendees } from './routes/get-event-attendees'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifyCors from '@fastify/cors'

const app = fastify()

app.register(fastifyCors, {
  origin: '*'
})

app.register(fastifySwagger, {
  swagger:{
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description: 'Documentacao API Node - NLW Unite',
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(checkIn)
app.register(getEventAttendees)

app.listen({
  port: 3333,
  host: '0.0.0.0'
}).then(() => {
  console.log('HTTP Server Running.')
})