<script lang="ts">
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { dateFnsUtils } from '../../storybook-utils/date-fns-adapter';
  import YearPicker from './YearPicker.svelte';
</script>

<Meta title="Example/YearPicker" component={YearPicker} />

<Template>
  <YearPicker dateAdapter={dateFnsUtils} />
</Template>

<Story name="Default" />
