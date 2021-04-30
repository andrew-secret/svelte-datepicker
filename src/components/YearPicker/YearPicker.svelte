<script lang="ts">
  import { onMount } from 'svelte';
  import type { IUtils } from '@date-io/core/IUtils';

  // TODO: move to shared constants file
  const defaultMinDate = new Date('1900-01-01');
  const defaultMaxDate = new Date('2099-12-31');

  export let dateAdapter: IUtils<Date>;
  export let minDate: Date = defaultMinDate;
  export let maxDate: Date = defaultMaxDate;
  export let currentMonth: Date;
  export let selectYear: (year: Date) => void;

  let focusedYear: number;
  let years: HTMLElement;

  function handleYearFocus(year: number): void {
    focusedYear = year;
  }

  function handleKeyDownFocus(index: number, focusedElement: HTMLElement) {
    focusedElement.blur();
    [...(years.childNodes as any)][index].focus();
  }

  function handleKeyDown(event: KeyboardEvent, year: Date) {
    const current = document.activeElement as HTMLElement;
    const yearItems = [...years.childNodes];
    const currentIndex = yearItems.indexOf(current);
    const yearNumber = dateAdapter.getYear(year);

    let newIndex: number;

    switch (event.key) {
      case 'ArrowUp':
        handleYearFocus(yearNumber - 4);
        newIndex = (currentIndex + yearItems.length - 4) % yearItems.length;
        handleKeyDownFocus(newIndex, current);
        event.preventDefault();
        break;
      case 'ArrowDown':
        handleYearFocus(yearNumber + 4);
        newIndex = (currentIndex + yearItems.length + 4) % yearItems.length;
        handleKeyDownFocus(newIndex, current);
        event.preventDefault();
        break;
      case 'ArrowLeft':
        handleYearFocus(yearNumber - 1);
        newIndex = (currentIndex + yearItems.length - 1) % yearItems.length;
        handleKeyDownFocus(newIndex, current);
        event.preventDefault();
        break;
      case 'ArrowRight':
        handleYearFocus(yearNumber + 1);
        newIndex = (currentIndex + yearItems.length + 1) % yearItems.length;
        handleKeyDownFocus(newIndex, current);
        event.preventDefault();
        break;
      default:
        break;
    }
  }

  onMount(() => {
    const selectedYear = [...years.childNodes].filter((year: HTMLElement) =>
      year.classList.contains('selected')
    );

    if (selectedYear[0]) {
      (selectedYear[0] as HTMLElement).scrollIntoView();
      (selectedYear[0] as HTMLElement).focus();
    }
  });

  function handleSelectClass(currentMonth: Date, date: Date): boolean {
    const currentMonthYear = dateAdapter.getYear(currentMonth);
    const year = dateAdapter.getYear(date);
    return currentMonthYear === year;
  }
</script>

<div class="year-picker" bind:this={years}>
  {#each dateAdapter.getYearRange(minDate, maxDate) as year, i}
    <button
      class="year-button"
      class:selected={handleSelectClass(currentMonth, year)}
      type="button"
      aria-pressed={handleSelectClass(currentMonth, year)}
      arial-label={year}
      on:focus={() => handleYearFocus(dateAdapter.getYear(year))}
      on:keydown={(event) => handleKeyDown(event, year)}
      on:click={() => selectYear(year)}
    >
      {dateAdapter.format(year, 'year')}
    </button>
  {/each}
</div>

<style>
  .year-picker {
    height: 100%;
    margin: 0 4px;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    flex-direction: row;
  }

  .year-button {
    flex-basis: 25%;

    color: unset;
    width: 72px;
    border: none;
    cursor: pointer;
    height: 36px;
    margin: 8px 0;
    outline: 0;
    font-size: 1rem;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    line-height: 1.75;
    border-radius: 16px;
    letter-spacing: 0.00938em;
    background-color: transparent;
  }

  .year-button:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  .year-button:focus {
    background-color: rgba(0, 0, 0, 0.04);
  }

  .year-button.selected {
    background-color: #1976d2;
    color: white;
  }
</style>
