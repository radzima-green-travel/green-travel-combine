import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { SystemBars, SystemBarStyle } from 'react-native-edge-to-edge';
import { useColorScheme } from './useColorScheme';

export function useStatusBar({ style }: { style: SystemBarStyle }) {
  const isFocused = useIsFocused();
  const scheme = useColorScheme();

  useEffect(() => {
    if (isFocused) {
      const statusBarStyle = getStatusBarStyle(scheme, style);

      const entry = SystemBars.pushStackEntry({
        style: {
          statusBar: statusBarStyle,
        },
      });

      return () => {
        SystemBars.popStackEntry(entry);
      };
    }
  }, [isFocused, style, scheme]);
}

// Default options from library work with the system theme, not the app theme
function getStatusBarStyle(
  scheme: 'light' | 'dark',
  style: SystemBarStyle,
): SystemBarStyle {
  return scheme === 'light'
    ? statusBarStyleMapLight[style]
    : statusBarStyleMapDark[style];
}

const statusBarStyleMapLight: Record<SystemBarStyle, SystemBarStyle> = {
  auto: 'dark',
  inverted: 'light',
  light: 'light',
  dark: 'dark',
};

const statusBarStyleMapDark: Record<SystemBarStyle, SystemBarStyle> = {
  auto: 'light',
  inverted: 'dark',
  light: 'light',
  dark: 'dark',
};
