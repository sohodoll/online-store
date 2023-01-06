import { getCurrPage } from '../src/pages/cart/cart';
import { currPage } from '../src/pages/cart/cart';

test('getcurrpage should return currpage', () => {
    expect(getCurrPage()).toBe(currPage);
});

test('getcurrpage should be defined', () => {
    expect(getCurrPage).toBeDefined;
    expect(getCurrPage).not.toBeUndefined;
});
