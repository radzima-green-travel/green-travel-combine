export type AppConfiguration = {
  featureToggles: {
    isFeatureAuthFlowEnabled: boolean;
  };
  maintanance: boolean;
  mandatoryAppUpdateVersion: {
    android: string;
    ios: string;
  };
  optionalAppUpdateVersion: {
    android: string;
    ios: string;
  };
  signIn: string;
  signUp: string;
  version: number;
};
