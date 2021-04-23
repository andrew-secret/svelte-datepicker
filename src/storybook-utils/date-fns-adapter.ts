import LuxonAdapter from '@date-io/luxon';
import DateFnsAdapter from "@date-io/date-fns";

export const dateFnsUtils = new DateFnsAdapter();
export const luxonUtils = new LuxonAdapter();