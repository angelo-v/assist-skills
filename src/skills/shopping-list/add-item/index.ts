import {itemAdded} from './responses';
import {say} from '#output/say';
import {AddItemOptions, Dependencies} from "../index";

export async function addItem(item: string, {listName, prefix}: AddItemOptions, {shoppingListService}: Dependencies) {
    const shoppingList = await shoppingListService.findShoppingList(
        listName
    );
    await shoppingList.addItem(prefix ? `${prefix} ${item}` : item);
    say(itemAdded(item));
}
