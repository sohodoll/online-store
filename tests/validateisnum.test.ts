import { generateUIEvent } from './../src/mocks/factories/generateUIEvent';
import { validateIsNum } from '../src/pages/components/form/form';

describe('validateIsNum', () => {
    it('should prevent the default action if the input is not a number', () => {
        // Set up a mock event object
        const mockEvent = generateUIEvent({ which: 49, preventDefault: jest.fn() });
        validateIsNum(mockEvent);

        expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });
});
