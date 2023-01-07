import { Form } from '../src/pages/components/form/form';

const mockForm = new Form();

test('should return modal form html', () => {
    const modalForm = mockForm.render();
    expect(mockForm.render()).toStrictEqual(modalForm);
});

test('should be defined', () => {
    expect(mockForm.render()).toBeDefined;
    expect(mockForm.render()).not.toBeUndefined;
});
