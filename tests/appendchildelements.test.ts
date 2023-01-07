import { appendChildElements } from '../src/pages/components/itemCart/itemCart';

test('appendChildElements appends child elements to the parent element', () => {
    // create a parent element
    const parentElem = document.createElement('div');

    // create some child elements
    const child1 = document.createElement('p');
    const child2 = document.createElement('span');
    const child3 = document.createElement('h1');

    // append the child elements to the parent element using the function
    appendChildElements(parentElem, [child1, child2, child3]);

    // expect the parent element to have 3 child nodes
    expect(parentElem.childNodes.length).toBe(3);
});
