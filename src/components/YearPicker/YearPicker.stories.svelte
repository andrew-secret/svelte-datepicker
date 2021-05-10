<script lang="ts">
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import { dateFnsUtils } from "../../utils/date-fns-adapter";
  import YearPicker from "./YearPicker.svelte";
</script>

<Meta title="Example/YearPicker" component={YearPicker} />

<Template>
  <YearPicker
    dateAdapter={dateFnsUtils}
    currentMonth={dateFnsUtils.date()}
    selectYear={() => null}
  />
</Template>

<Story name="Default" />
