import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import { defaultMaxDate, defaultMinDate } from '../../utils/date-default-ranges';
import { dateFnsUtils } from '../../utils/date-fns-adapter'
import YearPicker from './YearPicker.svelte';

describe('YearPicker', () => {
    const currentMonth = new Date('2021-01-04');
    const yearPickerProps = {
        minDate: defaultMinDate,
        maxDate: defaultMaxDate,
        dateAdapter: dateFnsUtils, 
        selectYear: jest.fn(), 
        currentMonth
    }

    it('should render component', () => {
        const { container } = render(YearPicker, {
            props: yearPickerProps,
        });

        expect(container).toMatchSnapshot();
    });

    describe(('keyboard navigation'), () => {
        it('should render w/ pre-selected year 2021', () => {
            const { getByRole } = render(YearPicker, {
                props: yearPickerProps,
            });
    
            const selectedYearButton = getByRole('button', { pressed: true });
            expect(selectedYearButton).toHaveTextContent('2021');
        });
    
        it('should focus previous year w/ left arrow key', async () => {
            const { getByText, container } = render(YearPicker, {
                props: yearPickerProps,
            });
    
            const yearsElement = container.querySelector('.year-picker') as HTMLElement;
            fireEvent.keyDown((yearsElement), { key: 'ArrowLeft'});
    
            await waitFor(() => expect(getByText('2020')).toHaveFocus());
        });
    
        it('should focus previous year w/ up arrow key', async () => {
            const { getByText, container } = render(YearPicker, {
                props: yearPickerProps,
            });
    
            const yearsElement = container.querySelector('.year-picker') as HTMLElement;
            fireEvent.keyDown(yearsElement, { key: 'ArrowUp'})
    
            await waitFor(() => expect(getByText('2017')).toHaveFocus());
        });
    
        it('should focus next year w/ right arrow key', async () => {
            const { getByText, container } = render(YearPicker, {
                props: yearPickerProps,
            });
    
            const yearsElement = container.querySelector('.year-picker') as HTMLElement;
            fireEvent.keyDown(yearsElement, { key: 'ArrowRight'})
    
            await waitFor(() => expect(getByText('2022')).toHaveFocus());
        });
    
        it('should focus next year w/ down arrow key', async () => {
            const { getByText, container } = render(YearPicker, {
                props: yearPickerProps,
            });
    
            const yearsElement = container.querySelector('.year-picker') as HTMLElement;
            fireEvent.keyDown(yearsElement, { key: 'ArrowDown'})
    
            await waitFor(() => expect(getByText('2025')).toHaveFocus());
        });
    });

    it('should call selectYear fn', () => {
        const selectYearMock = jest.fn();
        const { getByText } = render(YearPicker, {
            props: { ...yearPickerProps, selectYear: selectYearMock, currentMonth }
        });
        fireEvent.click(getByText('2025'));

        expect(selectYearMock).toHaveBeenCalled();
    });
});