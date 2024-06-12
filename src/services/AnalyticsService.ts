import {
  createInstance,
  Types,
  Identify,
} from '@amplitude/analytics-react-native';
import {Events, EventsPayload} from 'core/types';

class AnalyticsService {
  instance: Types.ReactNativeClient;

  constructor() {
    this.instance = createInstance();
  }

  init(apiKey: string) {
    this.instance.init(apiKey, undefined, {trackingSessionEvents: true});
    const identify = new Identify();
    identify.set('user_property_framework', 'react');
    this.instance.identify(identify);
  }

  logEvent(
    //deprecated
    eventType: Events,
    params?: Record<string, any>,
  ): Types.AmplitudeReturn<Types.Result> {
    return this.instance.logEvent(eventType, params);
  }

  log({name, data}: EventsPayload): Types.AmplitudeReturn<Types.Result> {
    return this.instance.logEvent(name, data);
  }
}

export const analyticsService = new AnalyticsService();
