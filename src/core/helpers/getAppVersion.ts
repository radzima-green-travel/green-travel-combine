import Config from 'react-native-ultimate-config';
import * as Application from 'expo-application';

export const getAppVersion = () => Application.nativeApplicationVersion;

export const getBuildNumber = () => Application.nativeBuildVersion;

export const getAppSettingsApplicationVersion = () => {
  const isDevEnv = Config.ENVIRONMENT === 'development';

  const appVersion = getAppVersion();
  const buildNumber = getBuildNumber();

  return isDevEnv ? `${appVersion}(${buildNumber})` : `${appVersion}`;
};
