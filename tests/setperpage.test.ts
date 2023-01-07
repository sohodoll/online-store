import { setPerPage } from '../src/pages/cart/cart';
import { perPage } from '../src/pages/cart/cart';

test('setPerPage sets the value of perPage', () => {
    setPerPage(3);
    expect(perPage).toBe(3);
});

test('setPerPage sets the value of perPage', () => {
    setPerPage(9);
    expect(perPage).toBe(9);
});

test('setPerPage sets the value of perPage', () => {
    setPerPage(6);
    expect(perPage).toBe(6);
});
