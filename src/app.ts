import Fastify, {FastifyInstance} from 'fastify'
import {shoppingList} from "./skills/shopping-list";


export function build(opts={}) {
    const app: FastifyInstance = Fastify(opts)
    shoppingList(app)
    return app
}

