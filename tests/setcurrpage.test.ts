import { setCurrPage } from '../src/pages/cart/cart';
import { currPage } from '../src/pages/cart/cart';

test('setCurrPage sets the value of currPage', () => {
    setCurrPage(5);
    expect(currPage).toBe(5);
});

test('setCurrPage sets the value of currPage', () => {
    setCurrPage(7);
    expect(currPage).toBe(7);
});

test('setCurrPage sets the value of currPage', () => {
    setCurrPage(4);
    expect(currPage).toBe(4);
});
