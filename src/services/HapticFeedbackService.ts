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

  async notify(notificationType = 'success') {
    switch (notificationType) {
      case 'success':
        await ExpoHaptics.notificationAsync(
          ExpoHaptics.NotificationFeedbackType.Success,
        );
        break;
      case 'warning':
        await ExpoHaptics.notificationAsync(
          ExpoHaptics.NotificationFeedbackType.Warning,
        );
        break;
      case 'error':
        await ExpoHaptics.notificationAsync(
          ExpoHaptics.NotificationFeedbackType.Error,
        );
        break;
      default:
        await ExpoHaptics.notificationAsync(
          ExpoHaptics.NotificationFeedbackType.Success,
        );
    }
  }

  async select() {
    await ExpoHaptics.selectionAsync();
  }
}

export const hapticFeedbackService = new HapticFeedbackService();
