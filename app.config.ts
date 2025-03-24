import withRemoveiOSNotificationEntitlement from './config-plugins/withRemoveiOSNotificationEntitlement';
import withAndroidQueries from './config-plugins/withAndroidQueries';

type Environment = 'DEV' | 'DEVCLIENT' | 'PROD';

const appIconAssets = {
  DEV: 'Icon.png',
  DEVCLIENT: 'Icon_Devclient.png',
  PROD: 'Icon.png',
} satisfies Record<Environment, string>;

const adaptiveIconAssets = {
  DEV: 'AndroidAdaptiveIcon.png',
  DEVCLIENT: 'AndroidAdaptiveIcon_Devclient.png',
  PROD: 'AndroidAdaptiveIcon.png',
} satisfies Record<Environment, string>;

const environment: Environment = (process.env.ENVIRONMENT ??
  'DEV') as Environment;

export default ({config}: Record<string, any>) => {
  return {
    ...config,
    updates: {
      enabled: false,
      url: 'https://u.expo.dev/9352bb3a-6c9e-4b4f-91a7-fd62ee1dcdd5',
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    name: process.env.APP_NAME ?? 'Radzima Dev',
    version: process.env.APP_VERSION ?? '1.10.0',
    ios: {
      ...config.ios,
      bundleIdentifier: process.env.IOS_BUNDLE_ID ?? 'com.greentravel.radzima',
      buildNumber: process.env.BUILD_NUMBER ?? '1',
      ...(process.env.DEEP_LINK_DOMAIN
        ? {
            associatedDomains: [`applinks:${process.env.DEEP_LINK_DOMAIN}`],
          }
        : {}),
      infoPlist: {
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: process.env.EAS_BUILD_TYPE === 'development',
        },
      },
    },
    android: {
      ...config.android,
      package: process.env.ANDROID_BUNDLE_ID ?? 'app.radzima.dev',
      versionCode: process.env.BUILD_NUMBER ?? 1,
      adaptiveIcon: {
        ...config.android.adaptiveIcon,
        foregroundImage: `src/assets/app/${adaptiveIconAssets[environment]}`,
      },
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
    icon: `src/assets/app/${appIconAssets[environment]}`,
    plugins: [
      ...config.plugins,
      [withAndroidQueries],
      [withRemoveiOSNotificationEntitlement],
      [
        '@rnmapbox/maps',
        {
          RNMapboxMapsVersion: '11.6.0',
          RNMapboxMapsDownloadToken: process.env.MAPBOX_DOWNLOAD_TOKEN ?? '',
        },
      ],
    ],
  };
};
