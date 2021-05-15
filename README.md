![svelte inclusive datepicker](./datepicker-cover.png)

[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/andrew-secret/svelte-inclusive-datepicker/blob/main/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/Naereen/badges/)

# Svelte inclusive date picker ⚠️ alpha version ⚠️

A lightweight and inclusive date picker build with svelte. Do you already use a specific date library in your project? That's fine! You can decide which date management library you want to use. It supports `date-fns`, `dayjs`, `luxon` and `moment` (even though its in maintenance mode now). The current implementation contains a day and year picker without inputs or modals. This project uses `date-io` as an abstraction over common date management libraries. That makes this component more convenient for consumers that are already using a specific date management library.

Just keep in mind that this is still a alpha version and things might change over time. 🏗

**[DEMO](https://svelte.dev/repl/9f8542d4ef354b88895bc827fabdc18f?version=3.38.2)**

## Prerequisites

- Download and install latest Version of [NodeJS](https://nodejs.org/en/) (`>=14.16.x`). If node was installed via [Homebrew](https://brew.sh/) you just need to update it.
- Works best with: Svelte `>=v3.38.1`

## Installation

- **IMPORTANT**: Install date management library of your choice in your project:
  - [`date-fns`](https://www.npmjs.com/package/date-fns)
  - [`dayjs`](https://www.npmjs.com/package/dayjs)
  - [`luxon`](https://www.npmjs.com/package/luxon)
  - [`moment`](https://www.npmjs.com/package/moment)

**Install date management library and the corresponding `date-io` adapter via [npm](https://github.com/npm/cli):**

```bash
# your date management library of choice
npm install date-fns

# date adapter (e.g. @date-io/<your-date-management-library>)
npm install @date-io/date-fns
```

**Install svelte date picker and via [npm](https://github.com/npm/cli):**

```bash
# install svelte-inclusive-datepicker with alpha
npm install svelte-inclusive-datepicker@alpha
```

## Usage

Now we have to important the **DatePicker** component and a **dateAdapter** which comes from `date-io`

```svelte
<!-- App.svelte -->
<script>
  import DateFnsAdapter from "@date-io/date-fns";
  import { DatePicker } from "svelte-inclusive-datepicker";

  const dateFnsAdapter = new DateFnsAdapter();

  let value = dateFnsAdapter.date();

  function handleSelectDay(e) {
    value = e.detail;
  }
</script>

<DatePicker
  {value}
  dateAdapter={dateFnsAdapter}
  on:selectDay={handleSelectDay}
/>
```

## Properties

| **Name**              | **Type**                        | **Default**             | **Description**                                                                                                                                                                                 | **Required** |
| --------------------- | ------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `dateAdapter`         | `IUtils<Date>`                  | undefined               | `date-io` adapter instance                                                                                                                                                                      | yes          |
| `locale`              | `string \| object \| undefined` | undefined               | `date-io` adapter instance                                                                                                                                                                      | no           |
| `value`               | `Date`                          | `dateFnsAdapter.date()` | `value` defaults to the current date                                                                                                                                                            | yes          |
| `focusedDay`          | `Date`                          | `dateFnsAdapter.date()` | `focusedDay` defaults to the same date as `value`                                                                                                                                               | no           |
| `minDate`             | `Date`                          | `defaultMinDate`        | `defaultMinDate` is set to `new Date("1900-01-01")`                                                                                                                                             | no           |
| `maxDate`             | `Date`                          | `defaultMaxDate`        | `defaultMaxDate` is set to `new Date("2099-12-31")`                                                                                                                                             | no           |
| `isFocusTrapDisabled` | `boolean`                       | `false`                 | If `isFocusTrapDisabled` is set to `true`, it's possible to navigate to other elements. Nevertheless, it's recommended to trap the focus if the date picker is used in modals or within inputs. | no           |

More props comming soon...

## Custom Events

In order to update the `value` property you can use the `on:selectDay` custom event handler, which receive the `event` with a `details` property inside.

| **Name**       | **Required** |
| -------------- | ------------ |
| `on:selectDay` | yes          |

Example:

```svelte
<!-- current date -->
let value = dateFnsAdapter.date();

<!-- it updates value property -->
function handleSelectDay(event) {
  value = event.detail
}

<DatePicker
  {value}
  dateAdapter={dateFnsAdapter}
  on:selectDay={handleSelectDay}
/>
```

## Accessibility

This date picker libary is trying to be more inclusive. Therefore I highly encoured everyone to contribute or give any feedback regarding accessibility. This date picker will be developed piece by piece and improved from accessibility perspective over time. Help me to build this together!

**Note:** This topic will be always prioritized over new features or other enhancements.

### Keyboard support day picker

- Left: Move to the previous day.
- Right: Move to the next day.
- Up: Move to the previous week.
- Down: Move to the next week.

### Keyboard support year picker

- Left: Move to the previous day.
- Right: Move to the next day.
- Up: Move to the previous week.
- Down: Move to the next week.

## Styling

Of course, you want to customize the date picker. This can be achieved by using CSS custom properties (aka CSS variables).

First I want to show you all CSS custom properties which are applied to the `:root` and scoped with `--sdp`:

```css
--sdp-border-radius: 4px;

--sdp-font-family: "Roboto", sans-serif;
--sdp-font-weight: 400;
--sdp-base-font-color: rgba(0, 0, 0, 0.87);

--sdp-accent-color: rgb(255, 62, 0);

--sdp-hover-bg-color: rgba(238, 238, 238, 0.625);
--sdp-hover-color: rgba(0, 0, 0, 0.87);

--sdp-bg-focus-color: var(--sdp-accent-color);
--sdp-focus-color: rgba(0, 0, 0, 0.87);

--sdp-bg-active-color: var(--sdp-accent-color);
--sdp-active-color: rgb(255, 255, 255);

--sdp-bg-selected-color: var(--sdp-accent-color);
--sdp-selected-color: rgb(255, 255, 255);

--sdp-bg-color: rgb(255, 255, 255);
--sdp-btn-bg-color: rgb(255, 255, 255);

--sdp-color-grey-500: rgb(80, 80, 80);
--sdp-color-grey-400: rgb(133, 133, 133);
--sdp-color-grey-300: rgb(216, 216, 216);
```

We got two different ways now to change those values to apply your styles.

- Apply new values through the `:root` element:

```svelte
<!-- YourApp.svelte -->
<DatePicker
  dateAdapter="{dateFnsAdapter}"
  {value}
  on:selectDay="{handleSelectDay2}"
/>

<style>
  :root {
    --sdp-accent-color: purple;
    --sdp-border-radius: 40px;
  }
</style>
```

- Just pass CSS custom properties directly to the date picker component via props:

```svelte
<!-- YourApp.svelte -->

  <DatePicker
    dateAdapter={dateFnsAdapter}
    {value}
    on:selectDay={handleSelectDay2}
    --sdp-border-radius="40px"
    --sdp-bg-focus-color="purple"
  />
```

### Caveats

This approach looks pretty neat, but it hast two main limiations regarding styling and compatibility.

- works only with Svelte `>=v3.38.1`
- at the moment it's not possible to change a value of a CSS custom property, which has another CSS custom property as a value

```css
--sdp-accent-color: rgb(255, 62, 0);

--sdp-bg-focus-color: var(--sdp-accent-color);
--sdp-bg-active-color: var(--sdp-accent-color);
--sdp-bg-selected-color: var(--sdp-accent-color);
```

```svelte
<!-- YourApp.svelte this won't work ❌ -->

<DatePicker
  dateAdapter="{dateFnsAdapter}"
  {value}
  on:selectDay="{handleSelectDay2}"
  --sdp-accent-color="purple"
/>
```

## Localization

Localization relies on the date management library of your choice. Therefore I will show three example for `date-fns`, `moment` and `luxon` of how to localize the svelte date picker. If you want to advance your configuration I advise you to read the documentation of the corrensponding date mangement library.

### Localization with `date-fns`

```svelte
<!-- App.svelte -->
<script>
  import DateFnsAdapter from "@date-io/date-fns";
  import fr from "date-fns/locale/fr";
  import { DatePicker } from "svelte-inclusive-datepicker";

  const dateFnsAdapter = new DateFnsAdapter();

  let value = dateFnsAdapter.date();

  function handleSelectDay(e) {
    value = e.detail;
  }
</script>

<DatePicker
  {value}
  locale={fr}
  dateAdapter={dateFnsAdapter}
  on:selectDay={handleSelectDay}
/>
```

### Localization with `moment`

```svelte
<!-- App.svelte -->
<script>
  import DayJsAdapter from "@date-io/moment";
  import { DatePicker } from "svelte-inclusive-datepicker";
  import moment from "moment";

  const dayJsAdapter = new DayJsAdapter();

  let value = dayJsAdapter.date();

  function handleSelectDay(e) {
    value = e.detail;
  }
</script>

<DatePicker
  {value}
  locale="fr"
  dateAdapter={dayJsAdapter}
  on:selectDay={handleSelectDay}
/>
```

### Localization with `luxon`

```svelte
<!-- App.svelte -->
<script>
  import LuxonAdapter from "@date-io/luxon";
  import { DatePicker } from "svelte-inclusive-datepicker";

  const luxonAdapter = new LuxonAdapter();

  let value = luxonAdapter.date();

  function handleSelectDay(e) {
    value = e.detail;
  }
</script>

<DatePicker
  {value}
  locale="fr"
  dateAdapter={luxonAdapter}
  on:selectDay={handleSelectDay}
/>
```

### Localization with `dayjs`

```svelte
  <!-- App.svelte -->
<script>
  import DayjsAdapter from "@date-io/dayjs"
  import { DatePicker } from "svelte-inclusive-datepicker";
  import "dayjs/locale/fr";
  import dayjs from "dayjs"

  dayjs.locale("de");
  const dayJsAdapter = new DayJsAdapter();

  let value = dayJsAdapter.date();

  function handleSelectDay(e) {
    value = e.detail;
  }
</script>

<DatePicker
  {value}
  dateAdapter={dayJsAdapter}
  on:selectDay={dayJsAdapter}
/>
```

For further information, take a look at the documentation of the corresponding date management library:

- [date-fns](https://date-fns.org/v2.21.3/docs/I18n)
- [moment](https://momentjs.com/docs/#/i18n/)
- [luxon](https://moment.github.io/luxon/docs/manual/intl.html)
- [dayjs](https://day.js.org/docs/en/i18n/i18n)

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

### Upcoming Features

- selectable date range
- callback functions for seveleral actions (e.g. switch to previous year)
- animations with motion reduced breakpoint
- Ideas?
