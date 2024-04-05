import {
  checkIn
} from "./chunk-OGGXT2KU.mjs";
import {
  createEvent
} from "./chunk-M7QRPOCD.mjs";
import "./chunk-KDMJHR3Z.mjs";
import {
  getEventAttendees
} from "./chunk-VAWXYXLU.mjs";
import {
  getEvent
} from "./chunk-JINTHMYO.mjs";
import {
  registerForEvent
} from "./chunk-DTCCTR5Z.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Documentacao API Node - NLW Unite",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(checkIn);
app.register(getEventAttendees);
app.listen({
  port: 3333,
  host: "0.0.0.0"
}).then(() => {
  console.log("HTTP Server Running.");
});
