import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/svelte';
import { dateFnsUtils } from '../../utils/date-fns-adapter'
import YearPicker from './YearPicker.svelte';

describe('YearPicker', () => {
    beforeEach(() => {
        let scrollIntoViewMock = jest.fn();
        window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    })
    const currentMonth = new Date('2021-01-04');

    it('should render component', () => {
        const { container } = render(YearPicker, {
            props: { dateAdapter: dateFnsUtils, selectYear: jest.fn(), currentMonth }
        });

        expect(container).toMatchSnapshot();
    });

    it('should render w/ pre-selected year 2021', () => {
        const { getByRole } = render(YearPicker, {
            props: { dateAdapter: dateFnsUtils, selectYear: jest.fn(), currentMonth }
        });

        const selectedYearButton = getByRole('button', { pressed: true });
        expect(selectedYearButton).toHaveTextContent('2021');
    });

    it('should focus previous year w/ left arrow key', () => {
        const { getByRole, getByText } = render(YearPicker, {
            props: { dateAdapter: dateFnsUtils, selectYear: jest.fn(), currentMonth }
        });

        const selectedYearButton = getByRole('button', { pressed: true });
        fireEvent.keyDown(selectedYearButton, {key: 'ArrowLeft'})

        expect(getByText('2020')).toHaveFocus();
    });

    it('should focus previous year w/ up arrow key', () => {
        const { getByRole, getByText } = render(YearPicker, {
            props: { dateAdapter: dateFnsUtils, selectYear: jest.fn(), currentMonth }
        });

        const selectedYearButton = getByRole('button', { pressed: true });
        fireEvent.keyDown(selectedYearButton, {key: 'ArrowUp'})

        expect(getByText('2017')).toHaveFocus();
    });

    it('should focus next year w/ right arrow key', () => {
        const { getByRole, getByText } = render(YearPicker, {
            props: { dateAdapter: dateFnsUtils, selectYear: jest.fn(), currentMonth }
        });

        const selectedYearButton = getByRole('button', { pressed: true });
        fireEvent.keyDown(selectedYearButton, {key: 'ArrowRight'})

        expect(getByText('2022')).toHaveFocus();
    });

    it('should focus next year w/ down arrow key', () => {
        const { getByRole, getByText } = render(YearPicker, {
            props: { dateAdapter: dateFnsUtils, selectYear: jest.fn(), currentMonth }
        });

        const selectedYearButton = getByRole('button', { pressed: true });
        fireEvent.keyDown(selectedYearButton, {key: 'ArrowDown'})

        expect(getByText('2025')).toHaveFocus();
    });

    it('should call selectYear fn', () => {
        const selectYearMock = jest.fn();
        const { getByRole, getByText } = render(YearPicker, {
            props: { dateAdapter: dateFnsUtils, selectYear: selectYearMock, currentMonth }
        });

        const selectedYearButton = getByRole('button', { pressed: true });
        fireEvent.keyDown(selectedYearButton, {key: 'ArrowDown'})
        fireEvent.click(getByText('2025'));

        expect(selectYearMock).toHaveBeenCalled();
    });
});