import Promocode from '../src/pages/templates/promocode';

describe('Promocode', () => {
    let promocode: Promocode;

    beforeEach(() => {
        promocode = new Promocode(1, 'TEST', 10);
    });

    test('constructor sets id, name, and value correctly', () => {
        expect(promocode.getID()).toEqual(2); // id is set to the input id + 1
        expect(promocode.name).toEqual('TEST');
        expect(promocode.getValue()).toEqual(10);
    });

    test('getUsed returns false by default', () => {
        expect(promocode.getUsed()).toBeFalsy();
    });

    test('setUsed sets used to true', () => {
        promocode.setUsed();
        expect(promocode.getUsed()).toBeTruthy();
    });

    test('setNotUsed sets used to false', () => {
        promocode.setUsed();
        promocode.setNotUsed();
        expect(promocode.getUsed()).toBeFalsy();
    });

    test('setValue updates the value', () => {
        promocode.setValue(20);
        expect(promocode.getValue()).toEqual(20);
    });
});
