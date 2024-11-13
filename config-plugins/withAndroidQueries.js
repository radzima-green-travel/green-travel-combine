const withAndroidManifest = require('@expo/config-plugins').withAndroidManifest;

const withAndroidQueries = config => {
  return withAndroidManifest(config, mod => {
    mod.modResults.manifest.queries = [
      {
        intent: [
          {
            action: [{$: {'android:name': 'android.intent.action.SENDTO'}}],
            data: [{$: {'android:scheme': 'mailto'}}],
          },
          {
            action: [{$: {'android:name': 'android.intent.action.DIAL'}}],
          },
        ],
      },
    ];

    return mod;
  });
};

module.exports = withAndroidQueries;
