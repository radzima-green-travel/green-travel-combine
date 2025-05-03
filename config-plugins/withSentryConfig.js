const {withSentry} = require('@sentry/react-native/expo');

const withSentryConfig = config =>
  withSentry(config, {
    url: 'https://sentry.io/',
    project: process.env.SENTRY_PROJECT,
    organization: process.env.SENTRY_ORG,
  });

module.exports = withSentryConfig;
