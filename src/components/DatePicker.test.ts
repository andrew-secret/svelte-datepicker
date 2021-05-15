import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen, waitFor, createEvent } from '@testing-library/svelte';
import { enUS } from 'date-fns/locale';
import { dateFnsUtils } from '../utils/date-fns-adapter'
import DatePicker from './DatePicker.svelte';

describe('Picker', () => {
    const value = new Date('2021-04-30');
    const props = {
        dateAdapter: dateFnsUtils,
        value,
        locale: dateFnsUtils.locale = enUS,
        focusedDay: value,
    }

    it('should render w/ day picker', () => {
        const { container } = render(DatePicker, props);

        expect(container).toMatchSnapshot();
    });

    it('should render w/ year picker', async () => {
        const { container } = render(DatePicker, props);
        const expandButton = screen.getByTestId('expand-button');
        await waitFor(() => fireEvent.click(expandButton));

        expect(container).toMatchSnapshot();
    });

    
    describe('click events', () => {
        it('should select day wihtin the current month', async () => {
            const { container } = render(DatePicker, props);
            const secondAprilButton = screen.getByText('2');

            const date = new Date('2021-04-02');

            const event = createEvent(
                'lol',
                secondAprilButton,
                {
                  detail: date,
                  type: 'selectDay'
                },
                { EventType: 'CustomEvent' }
              )

            await waitFor(() => fireEvent(secondAprilButton, event));
            expect(secondAprilButton).toHaveAttribute('aria-label', 'Fri Apr 02 2021 00:00:00 GMT+0000 (Coordinated Universal Time)');
        });

        it('should switch to previous month',() => {
            // TODO
        });

        it('should switch to next month', () => {
            // TODO
        });
    });

    describe('keyboard events', () => {
        it('should focus next day (ArrowRight)', () => {
            // TODO
        });

        it('should focus previous day (ArrowLeft)', () => {
            // TODO
        });

        it('should focus next week (ArrowDown)', () => {
            // TODO
        });

        it('should focus previous week (ArrowUp)', () => {
            // TODO
        });
    });
});