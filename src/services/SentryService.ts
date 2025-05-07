import * as Sentry from '@sentry/react-native';

class SentryService {
  init(options?: Sentry.ReactNativeOptions) {
    Sentry.init({
      dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
      environment: process.env.EXPO_PUBLIC_ENVIRONMENT,
      attachStacktrace: true,
      enableNative: true,
      ...options,
    });
  }

  logResponseError(error) {
    Sentry.withScope(scope => {
      scope.setExtra('Error Data', error || {});
      Sentry.captureException(error);
    });
  }

  logMapBoxError(error) {
    Sentry.withScope(scope => {
      scope.setExtra('Map Box Error data', error || {});
      Sentry.captureException(error);
    });
  }
}

export const sentryService = new SentryService();
