import {Identify, Amplitude} from '@amplitude/react-native';

type TabEvents =
  | 'navi_bookmarks_event'
  | 'navi_home_event'
  | 'navi_map_event'
  | 'navi_profile_event';
type ScreenViewEvents =
  | 'view_home_event'
  | 'view_map_event'
  | 'view_bookmarks_event'
  | 'view_details_event';
type HomeEvents =
  | 'home_card_event'
  | 'home_save_card_event'
  | 'home_unsave_card_event'
  | 'home_see_all_event';
type BookmarksEvents = 'saved_category_event' | 'saved_card_event';

type ObjectDetailsEvents =
  | 'card_details_save_event'
  | 'card_details_unsave_event'
  | 'card_details_map_event'
  | 'card_details_close_event'
  | 'card_details_scroll'
  | 'card_details_switch_photo';

type ScreenTimeEvents =
  | 'card_details_lifetime'
  | 'home_lifetime'
  | 'map_lifetime';

type Events =
  | TabEvents
  | ScreenViewEvents
  | HomeEvents
  | BookmarksEvents
  | ObjectDetailsEvents
  | ScreenTimeEvents;

type Params = {
  param_card_name: string;
  param_card_category: string;
  param_time_interval: number;
  param_category_name: string;
};

class AnalyticsService {
  instance: Amplitude;

  constructor() {
    this.instance = Amplitude.getInstance();
  }

  init(apiKey: string) {
    this.instance.trackingSessionEvents(true);
    this.instance.init(apiKey);
    const identify = new Identify();
    identify.set('user_property_framework', 'react');
    this.instance.identify(identify);
  }

  logEvent(eventType: Events, params?: Partial<Params>): Promise<boolean> {
    return this.instance.logEvent(eventType, params);
  }
}

export const analyticsService = new AnalyticsService();
