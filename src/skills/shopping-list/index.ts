import {getConfig} from "./config/config";
import {TrelloShoppingListService} from "./trello";
import axios, {AxiosInstance} from 'axios';
import {ShoppingListService} from "./service";
import { FastifyInstance, FastifyRequest } from "fastify";
import {addItem} from "./add-item";


export interface Dependencies {
    shoppingListService: ShoppingListService;
}

interface AddItemIntent {
    intent: 'AddItem',
    item: string,
    listName: string
    prefix?: string
}


function dependencies(): Dependencies {
    const config = getConfig(process.env);

    const trelloClient: AxiosInstance = axios.create({
        baseURL: config.trelloApiBaseUrl,
        headers: {
            Authorization: `OAuth oauth_consumer_key="${config.trelloOauthConsumerKey}", oauth_token="${config.trelloOauthToken}"`,
        },
    });

    const shoppingListService = new TrelloShoppingListService(
        config.trelloBoardId,
        trelloClient
    );

    return {shoppingListService};
}


export function shoppingList(app: FastifyInstance) {
    app.post('/shopping-list', async function (request: FastifyRequest<{ Body: AddItemIntent }>) {
        const { item, listName, prefix } = request.body
        const message = await addItem(item, {listName, prefix}, dependencies())
        return { message }
    })
}