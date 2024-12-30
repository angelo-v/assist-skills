import {describe, expect, it, jest} from '@jest/globals';

import { addItem } from ".";

import { say } from '../say';

jest.mock('../say');

describe('addItem', () => {
    it('should add an item to the shopping list', () => {
        const item = 'Milch';
        addItem(item);
        expect(say).toHaveBeenCalledWith('Milch hinzugefügt');
    });
});