import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/svelte';
import { dateFnsUtils } from '../storybook-utils/date-fns-adapter';
import Picker from './Picker.svelte';

describe('Picker', () => {
    const value = new Date('2021-04-30');
    const props = {
        dateAdapter: dateFnsUtils,
        value,
        focusedDay: value,
    }

    it('should render w/ daypicker', () => {
        const { container } = render(Picker, props);
        expect(container).toMatchSnapshot();
    });
});