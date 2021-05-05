import LuxonAdapter from '@date-io/luxon';
import DateFnsAdapter from "@date-io/date-fns";

// Should only be used in Storybook 
export const dateFnsUtils = new DateFnsAdapter();
export const luxonUtils = new LuxonAdapter();