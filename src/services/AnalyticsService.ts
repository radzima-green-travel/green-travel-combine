// import {Identify, Amplitude} from '@amplitude/react-native';
import {Events, EventsPayload} from 'core/types';

class AnalyticsService {
  // instance: Amplitude;

  constructor() {
    // this.instance = Amplitude.getInstance();
  }

  init(apiKey: string) {
    // this.instance.trackingSessionEvents(true);
    // this.instance.init(apiKey);
    // const identify = new Identify();
    // identify.set('user_property_framework', 'react');
    // this.instance.identify(identify);
  }

  logEvent(
    //deprecated
    eventType: Events,
    params?: Record<string, any>,
  ): Promise<boolean> {
   // return this.instance.logEvent(eventType, params);
  }

  log({name, data}: EventsPayload): Promise<boolean> {
    // return this.instance.logEvent(name, data);
  }
}

export const analyticsService = new AnalyticsService();
