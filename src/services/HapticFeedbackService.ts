import * as ExpoHaptics from 'expo-haptics';

class HapticFeedbackService {
  async trigger(impactStyle = 'light') {
    switch (impactStyle) {
      case 'light':
        await ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Light);
        break;
      case 'medium':
        await ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        await ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Heavy);
        break;
      default:
        await ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Light);
    }
  }
}

export const hapticFeedbackService = new HapticFeedbackService();
