import { getPerPage } from '../src/pages/cart/cart';
import { perPage } from '../src/pages/cart/cart';

test('getPerPage returns the correct value', () => {
    expect(getPerPage()).toBe(perPage);
});
