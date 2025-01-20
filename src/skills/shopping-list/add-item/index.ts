import {itemAdded} from './responses';
import {say} from '#output/say';
import {ShoppingListService} from "../service";

interface Options {
    listName: string;
    prefix?: string;
}

interface Dependencies {
    shoppingListService: ShoppingListService;
}


export async function addItem(item: string, {listName, prefix}: Options, {shoppingListService}: Dependencies) {
    const shoppingList = await shoppingListService.findShoppingList(
        listName
    );
    await shoppingList.addItem(prefix ? `${prefix} ${item}` : item);
    say(itemAdded(item));
}
