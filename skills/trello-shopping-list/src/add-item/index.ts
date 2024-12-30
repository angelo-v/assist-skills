import { itemAdded } from './responses';
import { say } from '../say';


export function addItem(item: string) {
    say(itemAdded(item));
}
