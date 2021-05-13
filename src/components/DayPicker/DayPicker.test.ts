import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';
import { defaultMaxDate, defaultMinDate } from '../../utils/date-default-ranges';
import { dateFnsUtils } from '../../utils/date-fns-adapter';
import DayPicker from './DayPicker.svelte';

describe('DayPicker', () => {
    const date = new Date('2021-01-04');
    const currentMonth = date;
    const fullMonth = dateFnsUtils.getWeekArray(currentMonth);
    const currentMonthNumber = dateFnsUtils.getMonth(currentMonth);

    const props = {
        dateAdapter: dateFnsUtils,
        fullMonth,
        minDate: defaultMinDate,
        maxDate: defaultMaxDate,
        selectedDates: [date],
        focusedDay: date,
        currentMonthNumber,
        onDaySelect: jest.fn(),
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