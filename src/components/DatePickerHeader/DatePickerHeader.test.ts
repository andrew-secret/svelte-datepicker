import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';
import { enGB, fr, ru } from 'date-fns/locale';
import { defaultMaxDate, defaultMinDate } from '../../utils/date-default-ranges';
import { dateFnsUtils } from '../../utils/date-fns-adapter';
import DatePickerHeader from './DatePickerHeader.svelte';

describe('DatePickerHeader', () => {
    beforeEach(() => {
        dateFnsUtils.locale = enGB;
    })
    const currentMonth = new Date('2021-01-04');

    const datePickerHeaderProps = {
        dateAdapter: dateFnsUtils,
        currentMonth,
        minDate: defaultMinDate,
        maxDate: defaultMaxDate,
        selectPreviousMonth: jest.fn(),
        selectNextMonth: jest.fn(),
        toggleYearPicker: jest.fn(),
    }

    it('should render component', () => {
        const { container } = render(DatePickerHeader, {
            props: datePickerHeaderProps,
        });

        expect(container).toMatchSnapshot();
    });

    it('should show selected year and month', () => {
        const { getByTestId } = render(DatePickerHeader, {
            props: datePickerHeaderProps
        });

        const selectedYear = getByTestId('selected-year');
        const selectedMonth = getByTestId('selected-month');

        expect(selectedYear).toHaveTextContent('2021');
        expect(selectedMonth).toHaveTextContent('January');
    });

    it('should show selected month w/ french locale', () => {
        dateFnsUtils.locale = fr;
        const { getByTestId } = render(DatePickerHeader, {
            props: datePickerHeaderProps,
        });

        const selectedMonth = getByTestId('selected-month');

        expect(selectedMonth).toHaveTextContent('janvier');
    });

    it('should show selected month w/ russian locale', () => {
        dateFnsUtils.locale = ru;
        const { getByTestId } = render(DatePickerHeader, {
            props: datePickerHeaderProps,
        });

        const selectedMonth = getByTestId('selected-month');

        expect(selectedMonth).toHaveTextContent('январь');
    });

    it('should show selected month w/ english locale', () => {
        const { getByTestId } = render(DatePickerHeader, {
            props: datePickerHeaderProps
        });

        const selectedMonth = getByTestId('selected-month');

        expect(selectedMonth).toHaveTextContent('January');
    });
});
