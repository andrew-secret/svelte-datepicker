<script lang="ts">
  import type { IUtils } from '@date-io/core/IUtils';
  import { createEventDispatcher, tick } from 'svelte';
  import DatePickerHeader from './DatePickerHeader/DatePickerHeader.svelte';
  import DayPicker from './DayPicker/DayPicker.svelte';
  import YearPicker from './YearPicker/YearPicker.svelte';
  import { openView } from './YearPicker/YearPickerStore';

  const defaultMinDate = new Date('1900-01-01');
  const defaultMaxDate = new Date('2099-12-31');

  export let dateAdapter: IUtils<Date>;
  export let locale: string | object | undefined;
  export let value: Date = dateAdapter.date();
  export let focusedDay = dateAdapter.date();
  export let minDate: Date = defaultMinDate;
  export let maxDate: Date = defaultMaxDate;

  const dispatch = createEventDispatcher();

  if (locale) {
    dateAdapter.locale = locale;
  }

  function onDaySelect(day: Date): void {
    dispatch('selectDay', day);
  }

  $: selectedDates = (Array.isArray(value) ? value : [value])
    .filter(Boolean)
    .map(
      (selectedDateItem) =>
        selectedDateItem && dateAdapter.startOfDay(selectedDateItem)
    );

  $: currentMonth = dateAdapter.startOfMonth(value ?? dateAdapter.date());
  $: currentMonthNumber = dateAdapter.getMonth(currentMonth);

  $: needMonthSwitch =
    Boolean(focusedDay) && !dateAdapter.isSameMonth(currentMonth, focusedDay);

  $: fullMonth = dateAdapter.getWeekArray(currentMonth);

  $: firstWeekOfMinDate = dateAdapter.getWeekArray(minDate)[0];

  function changeFocusedDay(newFocusDay: Date): void {
    if (focusedDay !== null && dateAdapter.isSameDay(newFocusDay, focusedDay)) {
      return;
    }

    // if (dateAdapter.isSameMonth(newFocusDay, minDate)) {
    //   return;
    // }

    console.log(
      'dateAdapter.isSameMonth',
      dateAdapter.isSameMonth(newFocusDay, minDate)
    );

    focusedDay = newFocusDay;

    needMonthSwitch =
      Boolean(focusedDay) && !dateAdapter.isSameMonth(currentMonth, focusedDay);

    currentMonth = needMonthSwitch
      ? dateAdapter.startOfMonth(focusedDay)
      : currentMonth;
  }

  const handleFocus = (focusedDay: Date): void => {
    changeFocusedDay(focusedDay);
  };

  async function handleKeyDown(event: KeyboardEvent, day: Date) {
    const current = document.activeElement;
    let items = [...document.querySelectorAll('.day[aria-hidden="false"]')];
    const currentIndex = items.indexOf(current);

    let newIndex: number;

    switch (event.key) {
      case 'ArrowUp':
        const previousWeek = dateAdapter.addDays(day, -7);
        const isWeekOutOfMinDateRange = dateAdapter.isSameMonth(
          previousWeek,
          dateAdapter.getPreviousMonth(minDate)
        );

        if (isWeekOutOfMinDateRange) {
          return;
        }
        console.log('bar', isWeekOutOfMinDateRange);

        changeFocusedDay(dateAdapter.addDays(day, -7));
        if (needMonthSwitch) {
          newIndex = 0;
        } else {
          newIndex = (currentIndex + items.length - 7) % items.length;
        }

        handeKeyDownFocus(newIndex, current);
        event.preventDefault();
        break;
      case 'ArrowDown':
        const nextWeek = dateAdapter.addDays(day, 7);
        console.log('nextWeek', nextWeek);
        const isWeekOutOfMaxDateRange = dateAdapter.isSameMonth(
          nextWeek,
          dateAdapter.getNextMonth(maxDate)
        );

        if (isWeekOutOfMaxDateRange) {
          return;
        }

        // This could perform a month switch
        changeFocusedDay(dateAdapter.addDays(day, 7));
        if (needMonthSwitch) {
          newIndex = 0;
        } else {
          newIndex = (currentIndex + items.length + 7) % items.length;
        }

        // This could perform a month switch
        handeKeyDownFocus(newIndex, current);
        event.preventDefault();
        break;
      case 'ArrowLeft':
        if (dateAdapter.isSameDay(day, minDate)) {
          return;
        }

        // This could perform a month switch
        changeFocusedDay(dateAdapter.addDays(day, -1));
        if (needMonthSwitch) {
          newIndex = 0;
        } else {
          newIndex = (currentIndex + items.length - 1) % items.length;
        }

        // This could perform a month switch
        handeKeyDownFocus(newIndex, current);
        event.preventDefault();
        break;
      case 'ArrowRight':
        if (dateAdapter.isSameDay(day, maxDate)) {
          return;
        }

        // This could perform a month switch
        changeFocusedDay(dateAdapter.addDays(day, 1));
        if (needMonthSwitch) {
          newIndex = 0;
        } else {
          newIndex = (currentIndex + items.length + 1) % items.length;
        }
        handeKeyDownFocus(newIndex, current);
        event.preventDefault();
        break;
      case 'Tab':
        newIndex = currentIndex;

      case 'Enter':
        newIndex = currentIndex;
      default:
        break;
    }
  }

  async function handeKeyDownFocus(index: number, activeElement: Element) {
    let newItems;

    (activeElement as any).blur();

    // because of two maps we have to wait 200ms
    if (needMonthSwitch) {
      await tick();
      newItems = [...document.querySelectorAll('.day[aria-hidden="false"]')];
      (newItems[0] as any).focus();
    }

    if (!needMonthSwitch) {
      await tick();
      newItems = [...document.querySelectorAll('.day[aria-hidden="false"]')];
      (newItems[index] as any).focus();
    }
  }

  function selectNextMonth() {
    currentMonth = dateAdapter.getNextMonth(currentMonth);
    focusedDay = currentMonth;
  }

  function selectPreviousMonth() {
    currentMonth = dateAdapter.getPreviousMonth(currentMonth);
    focusedDay = currentMonth;
  }

  function selectYear(year: Date): void {
    const yearNumber = dateAdapter.getYear(year);
    value = dateAdapter.setYear(focusedDay, yearNumber);
    openView.setOpenView('days');
  }
</script>

<!-- your code here -->
<h1>Date: {value}!</h1>

<div class="date-picker">
  <DatePickerHeader
    {dateAdapter}
    {currentMonth}
    {selectNextMonth}
    {selectPreviousMonth}
  />
  {#if $openView === 'year'}
    <YearPicker {dateAdapter} {currentMonth} {selectYear} />
  {/if}

  {#if $openView === 'days'}
    <DayPicker
      {minDate}
      {maxDate}
      {dateAdapter}
      {fullMonth}
      {selectedDates}
      {currentMonthNumber}
      {focusedDay}
      {onDaySelect}
      {handleKeyDown}
      {handleFocus}
    />
  {/if}
</div>

<style>
  .date-picker {
    width: 320px;
    margin: 0 auto;
    display: flex;
    max-height: 358px;
    overflow-x: hidden;
    flex-direction: column;
  }
</style>
