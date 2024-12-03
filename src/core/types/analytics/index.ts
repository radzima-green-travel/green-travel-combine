import {FiltersEvents} from './filters';
import {ObjectDetailsEvents} from './objectDetails';
export {
  AnalyticsNavigationScreenNames,
  AnalyticsModalNames,
  Events,
} from './common';

export {AnalyticsAddInfoFieldsNames} from './objectDetails';
import {SearchEvents} from './search';

export type EventsPayload = ObjectDetailsEvents | SearchEvents | FiltersEvents;
