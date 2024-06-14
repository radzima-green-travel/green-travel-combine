import * as Application from 'expo-application';

export const getAppVersion = () => Application.nativeApplicationVersion;

export const getBuildNumber = () => Application.nativeBuildVersion;

export const getAppSettingsApplicationVersion = () => {
  const isDevEnv = process.env.EXPO_PUBLIC_ENVIRONMENT === 'development';

  const appVersion = getAppVersion();
  const buildNumber = getBuildNumber();

  return isDevEnv ? `${appVersion}(${buildNumber})` : `${appVersion}`;
};
