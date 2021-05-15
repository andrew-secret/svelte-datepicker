<script lang="ts">
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import { dateFnsUtils } from "../utils/date-fns-adapter";
  import DatePicker from "./DatePicker.svelte";

  export let value = dateFnsUtils.date();
  export let value2 = dateFnsUtils.date();

</script>

<Meta title="Example/DatePicker" component={DatePicker} />

<Template>
  <section>
    <h1>Don't grow up it's a trap</h1>
    <strong>Well actually it's a focus trap...</strong>
    <a href="/">a really useless link</a>
    <time>{value}</time>
    <DatePicker
      {value}
      dateAdapter={dateFnsUtils}
      minDate={new Date("2020-05-05")}
      maxDate={new Date("2021-05-30")}
      on:selectDay={(e) => {
        value = e.detail;
      }}
    />
    <label for="name">Name</label>
    <input name="name" type="text" />

    <label for="something">Something</label>
    <input name="something" type="text" />

    <DatePicker
      dateAdapter={dateFnsUtils}
      value={value2}
      on:selectDay={(e) => {
        value2 = e.detail;
      }}
    />
  </section>
</Template>

<Story name="DateFns Adapter" />

<style>
  section {
    display: flex;
    flex-direction: column;
    max-width: 620px;
    margin: 0 auto;
  }

  * + * {
    margin-bottom: 20px;
  }

</style>
