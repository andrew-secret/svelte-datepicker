![svelte inclusive datepicker](./datepicker-cover.png)

![example branch parameter](https://github.com/andrew-secret/svelte-datepicker/actions/workflows/ci.yml/badge.svg?branch=feature-1)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/andrew-secret/svelte-datepicker/blob/main/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/Naereen/badges/)

# Svelte inclusive date picker ⚠️ alpha version ⚠️

A lightweight and inclusive datepicker build with svelte. You already use specific date library in your project? That's fine! You can decide which date management library you want to use. It supports `date-fns`, `dayjs`, `luxon` and `moment` (even though its deprecated). The current implementation contains a day and year picker without inputs or modals.

Just keep in mind that this is still a alpha version and things might change over time.

## Prerequisites

- Works best with: Svelte `>=v3.38.1`

## Installation

- **IMPORTANT**: Install date management library of your choice:
  - `date-fns`
  - `dayjs`
  - `luxon`
  - `moment` (deprecated)

The package can be installed via [npm](https://github.com/npm/cli):

```bash
npm install svelte-datepicker
```

## Usage

Now we have to important the **Picker** component and a **dateAdapter**

```svelte
<!-- App.svelte -->
<script>
  import { Picker, DateFnsAdapter } from "svelte-inclusive-datepicker";
  import "svelte-inclusive-datepicker/dist/index.mjs.css";

  const dateFnsAdapter = new DateFnsAdapter();

  export let value = dateFnsAdapter.date();

  function handleSelectDay(e) {
    value = e.detail;
  }
</script>

<main>
  <Picker
    {value}
    dateAdapter="{dateFnsAdapter}"
    on:selectDay="{handleSelectDay}"
  />
</main>
```

## Properties

TODO: some properties...

## Events

TODO: some events...

## Accessibility

### Keyboard support day picker

description

### Keyboard support year picker

description

## Styling

TODO: describe styling

## Localization

TODO: describe localization

## Browser Support

The date picker is compatible with the latest versions of Edge, Firefox, Safari, and Chrome. Unfortunately, it is difficult to support legacy browsers while maintaining our ability to develop new features in the future. **Therefore there's no support for IE11!**

## Contribution

Feel free to contribute to this project. You are more than welcome to create issues, provide feedback and create pull requests. Do you want to work on an open issue? Let us all know about that issue so we'll avoid conflicts.

### Local development

```bash
# install dependencies
npm install

# run storybook
npm run storybook

# build
npm run build
```
