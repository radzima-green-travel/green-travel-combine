import * as Sentry from '@sentry/react-native';
import config from 'react-native-ultimate-config';

class SentryService {
  init() {
    Sentry.init({
      dsn: config.SENTRY_DSN,
      environment: config.ENVIRONMENT,
      attachStacktrace: true,
      enableNative: true,
    });
  }

  logResponseError(error) {
    Sentry.withScope((scope) => {
      scope.setExtra('Error Data', error || {});
      Sentry.captureException(error);
    });
  }
}

export const sentryService = new SentryService();
