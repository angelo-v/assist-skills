import {Command} from 'commander';

export const program = new Command();

import {program as shoppingList} from "./skills/shopping-list";

program
    .name('assist-skills')
    .description('Collection of skills for Home Assistant')
    .version('1.0.0');

program.addCommand(shoppingList)
