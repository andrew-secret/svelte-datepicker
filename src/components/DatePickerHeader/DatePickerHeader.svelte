<script lang="ts">
  import type { IUtils } from "@date-io/core/IUtils";
  import { openView } from "../YearPicker/YearPickerStore";

  // TODO: move to shared constants file
  const defaultMinDate = new Date("1900-01-01");
  const defaultMaxDate = new Date("2099-12-31");

  export let dateAdapter: IUtils<Date>;
  export let currentMonth: Date;
  export let minDate: Date = defaultMinDate;
  export let maxDate: Date = defaultMaxDate;
  export let selectPreviousMonth: () => void;
  export let selectNextMonth: () => void;

  function toggleYearPicker() {
    if ($openView === "days") {
      openView.setOpenView("year");
    } else if ($openView === "year") {
      openView.setOpenView("days");
    }
  }

  $: shouldDisableMinDate = dateAdapter.isSameMonth(currentMonth, minDate);
  $: shouldDisableMaxDate = dateAdapter.isSameMonth(currentMonth, maxDate);
</script>

<div class="calendar-header">
  <div class="year-switcher-wrapper">
    <time
      datetime={dateAdapter.format(currentMonth, "fullDate")}
      data-testid="selected-month"
      aria-live="polite"
      class="year-switcher-label"
      >{dateAdapter.format(currentMonth, "month")}</time
    >
    <time
      datetime={dateAdapter.format(currentMonth, "fullDate")}
      data-testid="selected-year"
      aria-live="polite"
      class="year-switcher-label"
    >
      {dateAdapter.format(currentMonth, "year")}</time
    >
    <button
      class="month-switcher"
      type="button"
      aria-pressed={$openView === "year"}
      on:click={toggleYearPicker}
      data-testid="expand-button"
    >
      <span class="month-switcher-label">
        <svg
          class="caret"
          fill="currentColor"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"><path d="M7 10l5 5 5-5z" /></svg
        >
      </span>
    </button>
  </div>
  {#if $openView === "days"}
  <div class="month-switcher-wrapper">
    <button
      disabled={shouldDisableMinDate}
      class="month-switcher previous-month"
      aria-label="previous month"
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
      aria-label="next month"
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
  {/if}
</div>

<style lang="scss">
  .calendar-header {
    display: flex;
    justify-content: space-between;
  }

  .year-switcher-wrapper {
    display: flex;
    align-items: center;
  }

  .year-switcher-label {
    font-size: 1rem;
    font-family: var(--sdp-font-family);
    font-weight: var(--sdp-font-weight);
  }

  .month-switcher-wrapper {
    display: flex;
  }

  .month-switcher {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border: none;
    padding: 0;
    cursor: pointer;
    background-color: transparent;
    border-radius: var(--sdp-border-radius);
    transition: background-color 200ms ease-in-out;

    &[aria-pressed]:focus {
      outline: none;
      box-shadow: 0 0 0 0.15rem var(--sdp-bg-focus-color);
    }

    &[aria-pressed="true"] {
      span {
        transform: rotate(180deg);
       }
    }

    &[aria-pressed="false"] {
      span {
        transform: rotate(0deg);
      }
    }

    &:hover {
      color:var(--sdp-hover-color);
      background-color: var(--sdp-hover-bg-color);
    }

    &:focus {
      outline: none;
      box-shadow: inset 0 0 0 0.15rem var(--sdp-bg-focus-color);
    }
  }

  .month-switcher:active {
    color: var(--sdp-active-color);
    background-color: var(--sdp-bg-active-color);
  }

  .month-switcher-label {
    display: flex;
    width: 20px;
  }
</style>
