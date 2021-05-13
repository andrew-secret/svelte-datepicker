<script lang="ts">
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import {
    defaultMaxDate,
    defaultMinDate,
  } from "../../utils/date-default-ranges";
  import { dateFnsUtils } from "../../utils/date-fns-adapter";
  import DayPicker from "./DayPicker.svelte";

  let date = new Date("2021-01-04");
  let currentMonth = date;
</script>

<Meta title="Example/DayPicker" component={DayPicker} />

<Template>
  <DayPicker
    dateAdapter={dateFnsUtils}
    fullMonth={dateFnsUtils.getWeekArray(currentMonth)}
    currentMonthNumber={dateFnsUtils.getMonth(currentMonth)}
    selectedDates={[date]}
    minDate={defaultMinDate}
    maxDate={defaultMaxDate}
    handleFocus={() => null}
    onDaySelect={() => null}
  />
</Template>

<Story name="Default" />
