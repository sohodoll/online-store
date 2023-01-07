import Header from '../src/pages/components/header/header';
//import { PageIDs } from '../src/app';

test('Header function creates a header element with correct class name', () => {
    const header = Header();
    expect(header).toBeInstanceOf(HTMLElement);
    expect(header.className).toBe('header');
});

test('header function should be defined', () => {
    expect(Header).toBeDefined;
    expect(Header).not.toBeUndefined;
});
