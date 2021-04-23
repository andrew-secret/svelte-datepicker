<script lang="ts">
  import type { IUtils } from '@date-io/core/IUtils';
  import { openView } from '../YearPicker/YearPickerStore';

  // TODO: move to shared constants file
  const defaultMinDate = new Date('1900-01-01');
  const defaultMaxDate = new Date('2099-12-31');

  export let dateAdapter: IUtils<Date>;
  export let currentMonth: Date;
  export let minDate: Date = defaultMinDate;
  export let maxDate: Date = defaultMaxDate;
  export let selectPreviousMonth: () => void;
  export let selectNextMonth: () => void;

  function toggleYearPicker() {
    if ($openView === 'days') {
      openView.setOpenView('year');
    } else if ($openView === 'year') {
      openView.setOpenView('days');
    }
  }

  $: shouldDisableMinDate = dateAdapter.isSameMonth(currentMonth, minDate);
  $: shouldDisableMaxDate = dateAdapter.isSameMonth(currentMonth, maxDate);
</script>

<div class="calendar-header">
  <div class="year-switcher-wrapper">
    <span aria-live="polite" class="year-switcher-label"
      >{dateAdapter.format(currentMonth, 'month')}</span
    >
    <span aria-live="polite" class="year-switcher-label"
      >{dateAdapter.format(currentMonth, 'year')}</span
    >
    <button class="month-switcher" type="button" on:click={toggleYearPicker}>
      <span class="month-switcher-label">
        <svg
          class="caret"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          data-testid="ArrowDropDownIcon"><path d="M7 10l5 5 5-5z" /></svg
        >
      </span>
    </button>
  </div>
  <div class="month-switcher-wrapper">
    <button
      disabled={shouldDisableMinDate}
      class="month-switcher previous-month"
      on:click={selectPreviousMonth}
    >
      <span class="month-switcher-label">
        <svg
          fill="currentColor"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          data-testid="ArrowLeftIcon"
          ><path
            d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
          /></svg
        >
      </span>
    </button>
    <button
      disabled={shouldDisableMaxDate}
      class="month-switcher next-month"
      on:click={selectNextMonth}
    >
      <span class="month-switcher-label">
        <svg
          fill="currentColor"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          data-testid="ArrowRightIcon"
          ><path
            d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
          /></svg
        >
      </span>
    </button>
  </div>
</div>

<style>
  .calendar-header {
    display: flex;
    justify-content: space-between;
  }

  .month-switcher {
    border: none;
    padding: 0;
    background-color: transparent;
  }

  .month-switcher-label {
    display: flex;
    width: 20px;
  }
</style>
