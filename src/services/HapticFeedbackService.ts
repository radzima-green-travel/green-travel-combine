import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: true,
};

class HapticFeedbackService {
  trigger(
    impact: ReactNativeHapticFeedback.HapticFeedbackTypes = 'impactLight',
  ) {
    ReactNativeHapticFeedback.trigger(impact, options);
  }
}

export const hapticFeedbackService = new HapticFeedbackService();
