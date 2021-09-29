import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
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
