<script lang="ts">
  import type { IUtils } from "@date-io/core/IUtils";
  export let dateAdapter: IUtils<Date>;
  export let fullMonth: Date[][];
  export let selectedDates: Date[];
  export let currentMonthNumber: number;
  export let focusedDay: Date;
  export let minDate: Date;
  export let maxDate: Date;
  export let onDaySelect: (day: Date) => void;
  export let handleFocus: (focusedDay: Date) => void;

  let currentDay = dateAdapter.date() as Date;

  function handleDisabledDay(day: Date): boolean {
    const isDayDisabled =
      !dateAdapter.isWithinRange(day, [minDate, maxDate]) &&
      !dateAdapter.isSameDay(day, minDate) &&
      !dateAdapter.isSameDay(day, maxDate);

    return isDayDisabled;
  }

  function handleTabIndex(day: Date): number {
    const isSelected = selectedDates.some(
      (selectedDate) => selectedDate && dateAdapter.isSameDay(selectedDate, day)
    );

    const isFocused = dateAdapter.isSameDay(day, focusedDay);

    if (isSelected || isFocused) {
      return 0;
    }
    return -1;
  }

</script>

<div class="weekdays">
  {#each dateAdapter.getWeekdays() as day}
    <span class="weekday-label" title={day}>
      {day}
    </span>
  {/each}
</div>

<div role="grid">
  {#each fullMonth as week}
    <div class="week" role="row">
      {#each week as day, i}
        <!-- svelte-ignore a11y-autofocus  -->
        <div role="cell">
          <button
            aria-hidden={dateAdapter.getMonth(day) !== currentMonthNumber}
            aria-label={day}
            type="button"
            class="day"
            disabled={handleDisabledDay(day)}
            data-testid={dateAdapter.getMonth(day) !== currentMonthNumber
              ? "hidden-day"
              : "visible-day"}
            tabindex={handleTabIndex(day)}
            class:today={dateAdapter.isSameDay(day, currentDay)}
            class:selected={selectedDates.some(
              (selectedDate) =>
                selectedDate && dateAdapter.isSameDay(selectedDate, day)
            )}
            class:outside-of-current-month={dateAdapter.getMonth(day) !==
              currentMonthNumber}
            on:click={() => {
              onDaySelect(day);
            }}
            on:focus={() => handleFocus(day)}
            autofocus={focusedDay !== null &&
              dateAdapter.isSameDay(day, focusedDay)}
          >
            {dateAdapter.format(day, "dayOfMonth")}
          </button>
        </div>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .weekdays {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
  }

  div[role="grid"] {
    height: 280px;
  }

  .weekday-label {
    color: var(--sdp-color-grey-400);
    font-family: var(--sdp-font-family);
    width: 42px;
    height: 42px;
    margin: 0 4px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  .week {
    margin: 4px 0;
    display: flex;
    justify-content: center;
  }

  .day {
    color: var(--sdp-base-font-color);
    width: 42px;
    height: 42px;
    padding: 0;
    font-size: 0.85rem;
    font-family: var(--sdp-font-family);
    font-weight: 400;
    cursor: pointer;
    line-height: 1.66;
    border-radius: var(--sdp-border-radius);
    letter-spacing: 0.03333em;
    background-color: var(--sdp-btn-bg-color);
    transition: background-color 200ms ease-in-out;
    border: none;
    margin: 0 2px;

    &:hover {
      color: var(--sdp-hover-color);
      background-color: var(--sdp-hover-bg-color);
    }

    &:focus {
      outline: none;
      color: var(--sdp-focus-color);
      box-shadow: inset 0 0 0 0.15rem var(--sdp-bg-focus-color);
    }

    &:disabled {
      opacity: 0.35;
      pointer-events: none;
    }
  }

  .day:active {
    color: var(--sdp-active-color);
    background-color: var(--sdp-bg-active-color);
  }

  .day.selected {
    color: var(--sdp-selected-color);
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-weight: 500;
    background-color: var(--sdp-bg-selected-color);

    &:focus {
      outline: none;
      box-shadow: 0 0 0 0.15rem var(--sdp-bg-focus-color),
        inset 0 0 0 0.1rem var(--sdp-bg-color);
    }
  }

  .outside-of-current-month {
    visibility: hidden;
  }

  .today:not(.selected) {
    box-shadow: inset 0 0 0 0.15rem var(--sdp-base-font-color);

    &:focus {
      outline: none;
      color: var(--sdp-focus-color);
      box-shadow: inset 0 0 0 0.15rem var(--sdp-bg-focus-color);
    }
  }

</style>
