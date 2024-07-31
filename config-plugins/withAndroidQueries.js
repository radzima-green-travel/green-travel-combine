const {withAndroidManifest} = require('@expo/config-plugins');

const withAndroidQueries = config => {
  return withAndroidManifest(config, mod => {
    mod.modResults.manifest.queries = [
      {
        intent: [
          {
            action: [{$: {'android:name': 'android.intent.action.VIEW'}}],
            data: [{$: {'android:scheme': 'geo'}}],
          },
        ],
      },
    ];

    return mod;
  });
};

module.exports = withAndroidQueries;
