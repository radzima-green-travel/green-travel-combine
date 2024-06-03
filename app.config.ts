import withRemoveiOSNotificationEntitlement from './config-plugins/withRemoveiOSNotificationEntitlement';

type Dict = {[key: string]: any};
export default ({config}: Dict) => {
  return {
    ...config,
    plugins: [
      ...(config.plugins ?? []),
      [withRemoveiOSNotificationEntitlement],
      [
        '@rnmapbox/maps',
        {
          RNMapboxMapsVersion: '11.1.0',
          RNMapboxMapsDownloadToken: process.env.NETRC_PASSWORD ?? '',
        },
      ],
    ],
  };
};
