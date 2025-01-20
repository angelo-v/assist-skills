import {itemAdded} from './responses';
import {say} from 'output/say';
import {ShoppingListService} from "../service";


export async function addItem(item: string, listName: string, service: ShoppingListService) {
    const shoppingList = await service.findShoppingList(
        listName
    );
    await shoppingList.addItem(item.toString());
    say(itemAdded(item));
}
