import LuxonAdapter from '@date-io/luxon';
import DateFnsAdapter from "@date-io/date-fns";
import DayjsAdapter from '@date-io/dayjs'
import MomentUtils from '@date-io/moment'

// Should only be used in Storybook 
export const dateFnsUtils = new DateFnsAdapter();
export const luxonUtils = new LuxonAdapter();
export const dayJsUtils = new DayjsAdapter();
export const momentUtils = new MomentUtils();
