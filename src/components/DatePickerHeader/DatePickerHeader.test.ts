import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';
import { enGB, fr, ru } from 'date-fns/locale';
import { dateFnsUtils } from '../../storybook-utils/date-fns-adapter';
import DatePickerHeader from './DatePickerHeader.svelte';

describe('DatePickerHeader', () => {
    beforeEach(() => {
        dateFnsUtils.locale = enGB;
    })
    const currentMonth = new Date('2021-01-04');

    it('should render component', () => {
        const { container } = render(DatePickerHeader, {
            props: {
                dateAdapter: dateFnsUtils,
                currentMonth,
                selectPreviousMonth: jest.fn(),
                selectNextMonth: jest.fn(),
            }
        });

        expect(container).toMatchSnapshot();
    });

    it('should show selected year and month', () => {
        const { getByTestId } = render(DatePickerHeader, {
            props: {
                dateAdapter: dateFnsUtils,
                currentMonth,
                selectPreviousMonth: jest.fn(),
                selectNextMonth: jest.fn(),
            }
        });

        const selectedYear = getByTestId('selected-year');
        const selectedMonth = getByTestId('selected-month');

        expect(selectedYear).toHaveTextContent('2021');
        expect(selectedMonth).toHaveTextContent('January');
    });

    it('should render w/ disabled previous month button', () => {
        const minDate = new Date('1900-01-01');
        const { getByLabelText } = render(DatePickerHeader, {
            props: {
                dateAdapter: dateFnsUtils,
                currentMonth: minDate,
                selectPreviousMonth: jest.fn(),
                selectNextMonth: jest.fn(),
            }
        });

        const previousMonthButton = getByLabelText('previous month');

        expect(previousMonthButton).toBeDisabled();
    });

    it('should render w/ disabled previous month button', () => {
        const minDate = new Date('1900-01-01');
        const { getByLabelText } = render(DatePickerHeader, {
            props: {
                dateAdapter: dateFnsUtils,
                currentMonth: minDate,
                selectPreviousMonth: jest.fn(),
                selectNextMonth: jest.fn(),
            }
        });

        const previousMonthButton = getByLabelText('previous month');

        expect(previousMonthButton).toBeDisabled();
    });

    it('should render w/ disabled next month button', () => {
        const maxDate = new Date('2099-12-31');
        const { getByLabelText } = render(DatePickerHeader, {
            props: {
                dateAdapter: dateFnsUtils,
                currentMonth: maxDate,
                selectPreviousMonth: jest.fn(),
                selectNextMonth: jest.fn(),
            }
        });

        const nextMonthButton = getByLabelText('next month');

        expect(nextMonthButton).toBeDisabled();
    });

    it('should show selected month w/ french locale', () => {
        dateFnsUtils.locale = fr;
        const { getByTestId } = render(DatePickerHeader, {
            props: {
                dateAdapter: dateFnsUtils,
                currentMonth,
                selectPreviousMonth: jest.fn(),
                selectNextMonth: jest.fn(),
            }
        });

        const selectedMonth = getByTestId('selected-month');

        expect(selectedMonth).toHaveTextContent('janvier');
    });

    it('should show selected month w/ russian locale', () => {
        dateFnsUtils.locale = ru;
        const { getByTestId } = render(DatePickerHeader, {
            props: {
                dateAdapter: dateFnsUtils,
                currentMonth,
                selectPreviousMonth: jest.fn(),
                selectNextMonth: jest.fn(),
            }
        });

        const selectedMonth = getByTestId('selected-month');

        expect(selectedMonth).toHaveTextContent('январь');
    });

    it('should show selected month w/ english locale', () => {

        const { getByTestId } = render(DatePickerHeader, {
            props: {
                dateAdapter: dateFnsUtils,
                currentMonth,
                selectPreviousMonth: jest.fn(),
                selectNextMonth: jest.fn(),
            }
        });

        const selectedMonth = getByTestId('selected-month');

        expect(selectedMonth).toHaveTextContent('January');
    });
});
