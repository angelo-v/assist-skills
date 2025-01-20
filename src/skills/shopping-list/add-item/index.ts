import {itemAdded} from './responses';
import {say} from '#output/say';
import {ShoppingListService} from "../service";

interface Options {
    listName: string;
    prefix?: string;
}


export async function addItem(item: string, {listName, prefix}: Options, service: ShoppingListService) {
    const shoppingList = await service.findShoppingList(
        listName
    );
    await shoppingList.addItem(prefix ? `${prefix} ${item}` : item);
    say(itemAdded(item));
}
