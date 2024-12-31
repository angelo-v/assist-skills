import {describe, expect, it, jest} from '@jest/globals';
import {when} from 'jest-when'

import { addItem } from ".";

import { say } from '../say';
import {ShoppingList, ShoppingListService} from "../service";

jest.mock('../say');

describe('addItem', () => {
    it('should add an item to the shopping list', async () => {
        const item = 'Milch';
        const findShoppingList = jest.fn();
        const listAddItem = jest.fn();
        when(findShoppingList).calledWith("Einkaufen").mockReturnValue({
            getId: () => "1",
            addItem: listAddItem
        } as ShoppingList)
        await addItem(item, "Einkaufen", {findShoppingList} as ShoppingListService);
        expect(listAddItem).toHaveBeenCalledWith("Milch")
        expect(say).toHaveBeenCalledWith('Milch hinzugefügt');
    });
});