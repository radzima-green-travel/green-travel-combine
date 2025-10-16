import {FiltersEvents} from './filters';
import {ObjectDetailsEvents} from './objectDetails';
import {SearchEvents} from './search';
import {MainScreenEvents} from './home';
import {AddObjectAnalyticsEvent} from './addObject';
export {
  AnalyticsNavigationScreenNames,
  AnalyticsModalNames,
  Events,
} from './common';

export {AnalyticsAddInfoFieldsNames} from './objectDetails';

export type EventsPayload =
  | ObjectDetailsEvents
  | SearchEvents
  | FiltersEvents
  | MainScreenEvents
  | AddObjectAnalyticsEvent;
