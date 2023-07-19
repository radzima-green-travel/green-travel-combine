import Config from 'react-native-ultimate-config';
import * as Application from 'expo-application';

export const getAppVersion = () => {
  const isDevEnv = Config.ENVIRONMENT === 'development';

  const appVersion = Application.nativeApplicationVersion;
  const buildNumber = Application.nativeBuildVersion;

  return isDevEnv ? `${appVersion}(${buildNumber})` : `${appVersion}`;
};
