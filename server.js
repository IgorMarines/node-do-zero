// const server = createServer((request, response) => {
//     response.write('Olá mundo')


//     return response.end()
// })

// server.listen(3333)

import { fastify } from "fastify";
// import { DatabaseMemory } from "./databaseMemory.js";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify()
// const database = new DatabaseMemory()

const database = new DatabasePostgres()

// get, put, post, delete, patch

// Route Parameter

server.post('/videos',async (request, response) => {
    const {title, description, duration} = request.body

    await database.create({
        title: title,
        description: description,
        duration: duration
    })

    console.log(database.list())

    return response.status(201).send()
})

server.get('/videos',async (request) => {
    const search = request.query.search

    console.log(search)

    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body


    await database.update(videoId, {
        title: title,
        description : description,
        duration: duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(200).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 333,
})

