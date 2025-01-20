import {Command} from 'commander';
import {addItem} from './add-item';
import {getConfig} from "./config/config";
import {TrelloShoppingListService} from "./trello";
import axios, {AxiosInstance} from 'axios';

export const program = new Command();

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

program
    .name('shopping-list')
    .description('Manage your shopping list')
program
    .command('add-item <item>')
    .description('Add an item to the shopping list')
    .requiredOption('--list-name <listName>', 'Name of the shopping list')
    .option("--prefix <prefix>", "Prefix to add in front of the item, to indicate it has been added by a script")
    .action((item, options) => addItem(item, options, shoppingListService));


