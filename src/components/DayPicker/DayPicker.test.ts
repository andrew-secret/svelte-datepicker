import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/svelte';
import { enGB, fr, ru } from 'date-fns/locale';
import { dateFnsUtils } from '../../storybook-utils/date-fns-adapter';
import DayPicker from './DayPicker.svelte';

describe('DayPicker', () => {
    const date = new Date('2021-01-04');
    const currentMonth = date;
    const fullMonth = dateFnsUtils.getWeekArray(currentMonth);
    const currentMonthNumber = dateFnsUtils.getMonth(currentMonth);

    const props = {
        dateAdapter: dateFnsUtils,
        fullMonth,
        selectedDates: [date],
        focusedDay: date,
        currentMonthNumber,
        onDaySelect: jest.fn(),
        handleKeyDown: jest.fn(),
        handleFocus: jest.fn(),
    }

    it('should render component', () => {
        const { container } = render(DayPicker, {
            props,
        });
        expect(container).toMatchSnapshot();
    });

    it('should not render days from previous or next month', () => {
        const { getAllByTestId } = render(DayPicker, {
            props,
        });
        const allHiddenDays = getAllByTestId('hidden-day');

        allHiddenDays.map(hiddenDay => {
            expect(hiddenDay).not.toBeVisible();
        });
    });
});