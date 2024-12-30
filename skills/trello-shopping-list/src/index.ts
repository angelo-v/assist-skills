
import { Command } from 'commander';
import { addItem } from './add-item';
export const program = new Command();

program
    .name('trello-shopping-list-assist-skill')
    .description('CLI to manage Trello shopping list')
    .version('1.0.0');

program
    .command('add-item <item>')
    .description('Add an item to the shopping list')
    .action(addItem);


