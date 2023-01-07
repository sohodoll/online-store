import { countItemsInCart } from '../src/pages/components/itemCart/itemCart';

test('countitems should be defined', () => {
    expect(countItemsInCart).toBeDefined();
    expect(countItemsInCart).not.toBeUndefined();
});
