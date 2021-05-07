<script lang="ts">
  import { onMount } from "svelte";
  import type { IUtils } from "@date-io/core/IUtils";
  import {
    defaultMaxDate,
    defaultMinDate,
  } from "../../utils/date-default-ranges";
  import { openView } from "./YearPickerStore";

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

  function handleKeyDown(event: KeyboardEvent) {
    const current = document.activeElement as HTMLElement;
    const yearItems = [...years.childNodes];
    const currentIndex = yearItems.indexOf(current);
    const yearNumber = dateAdapter.getYear(currentMonth);

    let newIndex: number;

    if (!current || $openView === "days") {
      return;
    }

    switch (event.key) {
      case "ArrowUp":
        handleYearFocus(yearNumber - 4);
        newIndex = (currentIndex + yearItems.length - 4) % yearItems.length;
        handleKeyDownFocus(newIndex, current);
        event.preventDefault();
        break;
      case "ArrowDown":
        handleYearFocus(yearNumber + 4);
        newIndex = (currentIndex + yearItems.length + 4) % yearItems.length;
        handleKeyDownFocus(newIndex, current);
        event.preventDefault();
        break;
      case "ArrowLeft":
        handleYearFocus(yearNumber - 1);
        newIndex = (currentIndex + yearItems.length - 1) % yearItems.length;
        handleKeyDownFocus(newIndex, current);
        event.preventDefault();
        break;
      case "ArrowRight":
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
      year.classList.contains("selected")
    );
    if (selectedYear[0]) {
      (selectedYear[0] as HTMLElement).focus();
    }
  });

  function handleSelectClass(currentMonth: Date, date: Date): boolean {
    const currentMonthYear = dateAdapter.getYear(currentMonth);
    const year = dateAdapter.getYear(date);
    return currentMonthYear === year;
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="year-picker" bind:this={years}>
  {#each dateAdapter.getYearRange(minDate, maxDate) as year, i}
    <button
      class="year-button"
      class:selected={handleSelectClass(currentMonth, year)}
      type="button"
      aria-pressed={handleSelectClass(currentMonth, year)}
      arial-label={year}
      on:focus={() => handleYearFocus(dateAdapter.getYear(year))}
      on:click={() => selectYear(year)}
    >
      {dateAdapter.format(year, "year")}
    </button>
  {/each}
</div>

<style lang="scss">
  .year-picker {
    height: 100%;
    padding: 0 4px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    flex-direction: row;
    justify-content: space-between;
  }

  .year-button {
    flex-basis: calc(25% - 4px);
    color: unset;
    width: 72px;
    border: none;
    cursor: pointer;
    height: 42px;
    margin: 8px 0;
    outline: 0;
    font-size: 1rem;
    font-family: var(--sdp-font-family);
    font-weight: var(--sdp-font-weight);
    line-height: 1.75;
    border-radius: 16px;
    letter-spacing: 0.00938em;
    background-color: transparent;
    border-radius: var(--sdp-border-radius);
    transition: background-color 200ms ease-in-out;

    &:hover {
      color: var(--sdp-hover-color);
      background-color: var(--sdp-hover-bg-color);
    }

    &:focus {
      outline: none;
      box-shadow: inset 0 0 0 0.15rem var(--sdp-bg-focus-color);
    }
  }

  .year-button:active {
    color: var(--sdp-active-color);
    background-color: var(--sdp-bg-active-color);
  }

  .year-button.selected {
    color: var(--sdp-selected-color);
    background-color: var(--sdp-bg-selected-color);

    &:focus {
      outline: none;
      box-shadow: 0 0 0 0.15rem var(--sdp-bg-focus-color),
        inset 0 0 0 0.1rem var(--sdp-bg-color);
    }
  }
</style>
