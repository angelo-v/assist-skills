import {itemAdded} from './responses';
import {Dependencies} from "../index";

interface AddItemOptions {
    listName: string;
    prefix?: string;
}

export async function addItem(item: string, {listName, prefix}: AddItemOptions, {shoppingListService}: Dependencies): Promise<string> {
    const shoppingList = await shoppingListService.findShoppingList(
        listName
    );
    await shoppingList.addItem(prefix ? `${prefix} ${item}` : item);
    return itemAdded(item);
}
