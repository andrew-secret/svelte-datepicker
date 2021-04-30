<script lang="ts">
  import type { IUtils } from "@date-io/core/IUtils";
  export let dateAdapter: IUtils<Date>;
  export let fullMonth: Date[][];
  export let selectedDates: Date[];
  export let currentMonthNumber: number;
  export let focusedDay: Date;
  export let onDaySelect: (day: Date) => void;
  export let handleKeyDown: (event: Event, date: Date) => Promise<void>;
  export let handleFocus: (focusedDay: Date) => void;
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
        <button
          aria-hidden={dateAdapter.getMonth(day) !== currentMonthNumber}
          aria-label={day}
          role="cell"
          class="day"
          data-testid={dateAdapter.getMonth(day) !== currentMonthNumber
            ? "hidden-day"
            : "visible-day"}
          class:today={dateAdapter.isSameDay(day, dateAdapter.date())}
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
          on:keydown={(event) => handleKeyDown(event, day)}
          autofocus={focusedDay !== null &&
            dateAdapter.isSameDay(day, focusedDay)}
        >
          {dateAdapter.format(day, "dayOfMonth")}
        </button>
      {/each}
    </div>
  {/each}
</div>

<style>
  .weekdays {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .weekday-label {
    color: rgba(0, 0, 0, 0.6);
    width: 36px;
    height: 40px;
    margin: 0 2px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  .week {
    margin: 2px 0;
    display: flex;
    justify-content: center;
  }

  .day {
    color: rgba(0, 0, 0, 0.87);
    width: 36px;
    height: 36px;
    padding: 0;
    font-size: 0.75rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.66;
    border-radius: 50%;
    letter-spacing: 0.03333em;
    background-color: white;
    border: none;
    margin: 0 2px;
  }

  .day.selected {
    color: white;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-weight: 500;
    background-color: #1976d2;
  }

  .outside-of-current-month {
    visibility: hidden;
  }

  .today:not(.selected) {
    border: 1px solid rgba(0, 0, 0, 0.6);
  }
</style>
