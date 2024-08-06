import withRemoveiOSNotificationEntitlement from './config-plugins/withRemoveiOSNotificationEntitlement';

type Dict = {[key: string]: any};
export default ({config}: Dict) => {
  return {
    ...config,
    updates: {
      url: 'https://u.expo.dev/e51feb59-6254-4001-bc5a-d7a5df40dbcb',
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    name: process.env.APP_NAME ?? 'Radzima Dev',
    version: process.env.APP_VERSION ?? '1.10.0',
    ios: {
      ...(config.ios ?? {}),
      bundleIdentifier: process.env.IOS_BUNDLE_ID ?? 'com.greentravel.radzima',
      buildNumber: process.env.BUILD_NUMBER ?? '1',
      associatedDomains: [`applinks:${process.env.DEEP_LINK_DOMAIN}`],
    },
    android: {
      ...(config.android ?? {}),
      package: process.env.ANDROID_BUNDLE_ID ?? 'app.radzima.dev',
      versionCode: process.env.BUILD_NUMBER ?? '1',
      intentFilters: [
        {
          autoVerify: true,
          action: 'VIEW',
          data: {
            scheme: 'radzima',
          },
          category: ['BROWSABLE', 'DEFAULT'],
        },
        {
          autoVerify: true,
          action: 'VIEW',
          data: {
            scheme: 'https',
            host: process.env.DEEP_LINK_DOMAIN,
          },
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
    },
    plugins: [
      ...(config.plugins ?? []),
      [withRemoveiOSNotificationEntitlement],
      [
        '@rnmapbox/maps',
        {
          RNMapboxMapsVersion: '11.1.0',
          RNMapboxMapsDownloadToken: process.env.MAPBOX_DOWNLOAD_TOKEN ?? '',
        },
      ],
    ],
  };
};
