import {describe, expect, it, jest} from '@jest/globals';
import {when} from 'jest-when'

import { addItem } from "./index";

import {ShoppingList, ShoppingListService} from "../service";

describe('addItem', () => {
    it('should add an item to the shopping list', async () => {
        const item = 'Milch';
        const findShoppingList = jest.fn();
        const listAddItem = jest.fn();
        when(findShoppingList).calledWith("Einkaufen").mockReturnValue({
            getId: () => "1",
            addItem: listAddItem
        } as ShoppingList)
        const shoppingListService = {
            findShoppingList
        } as ShoppingListService
        const response = await addItem(item, {listName: "Einkaufen"}, {shoppingListService});
        expect(listAddItem).toHaveBeenCalledWith("Milch")
        expect(response).toEqual('Milch hinzugefügt');
    });

    it('should add an item including a prefix', async () => {
        const item = 'Milch';
        const findShoppingList = jest.fn();
        const listAddItem = jest.fn();
        when(findShoppingList).calledWith("Einkaufen").mockReturnValue({
            getId: () => "1",
            addItem: listAddItem
        } as ShoppingList)
        const shoppingListService = {
            findShoppingList
        } as ShoppingListService
        const response = await addItem(item, {listName: "Einkaufen", prefix: "🤖"}, {shoppingListService});
        expect(listAddItem).toHaveBeenCalledWith("🤖 Milch")
        expect(response).toEqual('Milch hinzugefügt');
    });
});