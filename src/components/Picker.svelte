<script lang="ts">
  import type { IUtils } from "@date-io/core/IUtils";
  import type { view } from "../utils/view-types";
  import { createEventDispatcher, setContext, tick } from "svelte";
  import DatePickerHeader from "./DatePickerHeader/DatePickerHeader.svelte";
  import DayPicker from "./DayPicker/DayPicker.svelte";
  import YearPicker from "./YearPicker/YearPicker.svelte";
  import { defaultMinDate, defaultMaxDate } from "../utils/date-default-ranges";
  import { writable } from "svelte/store";
  import { handleFocusTrap } from "../utils/focus-trap";
  import "./global.css";

  export let dateAdapter: IUtils<Date>;
  export let locale: string | object | undefined;
  export let value = dateAdapter.date() as Date;
  export let focusedDay = dateAdapter.date() as Date;
  export let minDate: Date = defaultMinDate;
  export let maxDate: Date = defaultMaxDate;
  export let isFocusTrapDisabled: boolean = false;

  const dispatch = createEventDispatcher();

  const view = writable<view>("days");
  setContext("view", view);

  let datepicker: HTMLElement;

  if (locale) {
    dateAdapter.locale = locale;
  }

  function onDaySelect(day: Date): void {
    dispatch("selectDay", day);
  }

  $: selectedDates = (Array.isArray(value) ? value : [value])
    .filter(Boolean)
    .map(
      (selectedDateItem) =>
        selectedDateItem && dateAdapter.startOfDay(selectedDateItem)
    );

  $: currentMonth = value ?? dateAdapter.date();
  $: currentMonthNumber = dateAdapter.getMonth(currentMonth);

  $: needMonthSwitch =
    Boolean(focusedDay) && !dateAdapter.isSameMonth(currentMonth, focusedDay);

  $: fullMonth = dateAdapter.getWeekArray(currentMonth);

  function changeFocusedDay(newFocusDay: Date): void {
    if (focusedDay !== null && dateAdapter.isSameDay(newFocusDay, focusedDay)) {
      return;
    }

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

  // TODO: Clean up this function and make it more DRY
  async function handleKeyDown(event: KeyboardEvent) {
    const current = document.activeElement as HTMLElement;

    await tick();
    let items = [...datepicker.querySelectorAll('.day[aria-hidden="false"]')];
    const currentIndex = current ? items.indexOf(current) : 0;

    /*
      If we we don't find a current on document or the
      year picker is open we don't handle event 
      delagation for the day picker.
    */
    if (!current || $view === "years") {
      return;
    }

    await tick();
    handleFocusTrap(event, {
      element: datepicker,
      classNames: `.month-switcher:not([disabled]), .day:not([tabindex='-1']`,
      isFocusTrapDisabled,
    });

    let newIndex: number;

    switch (event.key) {
      case "ArrowUp":
        const previousWeek = dateAdapter.addDays(focusedDay, -7);
        const isWeekOutOfMinDateRange = dateAdapter.isSameMonth(
          previousWeek,
          dateAdapter.getPreviousMonth(minDate)
        );

        if (isWeekOutOfMinDateRange) {
          return;
        }

        // This could perform a month switch
        changeFocusedDay(dateAdapter.addDays(focusedDay, -7));
        if (needMonthSwitch) {
          newIndex = 0;
        } else {
          newIndex = (currentIndex + items.length - 7) % items.length;
        }

        handeKeyDownFocus(newIndex, current);
        event.preventDefault();
        break;
      case "ArrowDown":
        const nextWeek = dateAdapter.addDays(focusedDay, 7);
        const isWeekOutOfMaxDateRange = dateAdapter.isSameMonth(
          nextWeek,
          dateAdapter.getNextMonth(maxDate)
        );

        if (isWeekOutOfMaxDateRange) {
          return;
        }

        // This could perform a month switch
        changeFocusedDay(dateAdapter.addDays(focusedDay, 7));
        if (needMonthSwitch) {
          newIndex = 0;
        } else {
          newIndex = (currentIndex + items.length + 7) % items.length;
        }

        // This could perform a month switch
        handeKeyDownFocus(newIndex, current);
        event.preventDefault();
        break;
      case "ArrowLeft":
        if (dateAdapter.isSameDay(focusedDay, minDate)) {
          return;
        }

        // This could perform a month switch
        changeFocusedDay(dateAdapter.addDays(focusedDay, -1));
        if (needMonthSwitch) {
          newIndex = 0;
        } else {
          newIndex = (currentIndex + items.length - 1) % items.length;
        }

        // This could perform a month switch
        handeKeyDownFocus(newIndex, current);
        event.preventDefault();
        break;
      case "ArrowRight":
        if (dateAdapter.isSameDay(focusedDay, maxDate)) {
          return;
        }

        // This could perform a month switch
        changeFocusedDay(dateAdapter.addDays(focusedDay, 1));

        if (needMonthSwitch) {
          newIndex = 0;
        } else {
          newIndex = (currentIndex + items.length + 1) % items.length;
        }

        handeKeyDownFocus(newIndex, current);
        event.preventDefault();
        break;
      case "Tab":
        newIndex = currentIndex;

      case "Enter":
        newIndex = currentIndex;
      default:
        break;
    }
  }

  async function handeKeyDownFocus(index: number, activeElement: HTMLElement) {
    let newItems: Element[];

    activeElement.blur();

    if (needMonthSwitch) {
      // because of DOM manipulation we have to use tick
      await tick();
      newItems = [...datepicker.querySelectorAll('.day[aria-hidden="false"]')];
      (newItems[0] as any).focus();
    }

    if (!needMonthSwitch) {
      // because of DOM manipulation we have to use tick
      await tick();
      newItems = [...datepicker.querySelectorAll('.day[aria-hidden="false"]')];
      (newItems[index] as any).focus();
    }
  }

  function selectNextMonth() {
    currentMonth = dateAdapter.getNextMonth(currentMonth);
    focusedDay = currentMonth;

    onDaySelect(currentMonth);
  }

  function selectPreviousMonth() {
    currentMonth = dateAdapter.getPreviousMonth(currentMonth);
    focusedDay = currentMonth;

    onDaySelect(currentMonth);
  }

  async function selectYear(year: Date): Promise<void> {
    const yearNumber = dateAdapter.getYear(year);

    /*
      update focusedDay to prevent month switch
      back to previous selection with keyboard controls
    */
    focusedDay = value;
    value = dateAdapter.setYear(focusedDay, yearNumber);
    onDaySelect(value);

    $view = "days";

    await tick();
    const selectedDay = datepicker.querySelector(".selected");
    if (selectedDay) {
      (selectedDay as HTMLButtonElement).focus();
    }
  }

  function toggleYearPicker() {
    if ($view === "days") {
      $view = "years";
    } else if ($view === "years") {
      $view = "days";
    }
  }
</script>

<div class="date-picker" bind:this={datepicker} on:keydown={handleKeyDown}>
  <DatePickerHeader
    {dateAdapter}
    {currentMonth}
    {selectNextMonth}
    {selectPreviousMonth}
    {toggleYearPicker}
  />
  {#if $view === "years"}
    <YearPicker {dateAdapter} {currentMonth} {selectYear} {datepicker} />
  {/if}

  {#if $view === "days"}
    <DayPicker
      {dateAdapter}
      {fullMonth}
      {selectedDates}
      {currentMonthNumber}
      {focusedDay}
      {onDaySelect}
      {handleFocus}
    />
  {/if}
</div>

<style>
  .date-picker {
    width: 322px;
    margin: 0 auto;
    display: flex;
    max-height: 380px;
    overflow-x: hidden;
    flex-direction: column;
    background-color: var(--sdp-bg-color);
  }
</style>
