<script lang="ts">
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import { dateFnsUtils } from "../storybook-utils/date-fns-adapter";
  import Picker from "./Picker.svelte";

  export let value = dateFnsUtils.date();
</script>

<Meta title="Example/Picker" component={Picker} />

<Template>
  <Picker
    dateAdapter={dateFnsUtils}
    {value}
    on:selectDay={(e) => {
      console.log("event", e);
      value = e.detail;
    }}
  />
</Template>

<Story name="DateFns Adapter" />
