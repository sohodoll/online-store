import { addUsedPromoCode } from '../src/pages/components/itemCart/itemCart';
test('should be defined', () => {
    expect(addUsedPromoCode).toBeDefined();
    expect(addUsedPromoCode).not.toBeUndefined();
});
