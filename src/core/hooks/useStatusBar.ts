import { useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useRef } from 'react';
import { SystemBars, SystemBarStyle } from 'react-native-edge-to-edge';
import { useColorScheme } from './useColorScheme';

export function useStatusBar({ style }: { style: SystemBarStyle }) {
  const isFocused = useIsFocused();
  const scheme = useColorScheme();
  const currentStyleRef = useRef(style);
  const entryRef = useRef<ReturnType<typeof SystemBars.pushStackEntry> | null>(
    null,
  );

  useEffect(() => {
    if (isFocused) {
      entryRef.current = SystemBars.pushStackEntry({
        style: {
          statusBar: getStatusBarStyle(scheme, currentStyleRef.current),
        },
      });

      return () => {
        if (entryRef.current) {
          SystemBars.popStackEntry(entryRef.current);
          entryRef.current = null;
        }
      };
    }
  }, [isFocused, style, scheme]);

  return {
    // Stable reference across renders so callers passing this to runOnJS don't re-register reactions
    setStyle: useCallback(
      (nextStyle: SystemBarStyle) => {
        currentStyleRef.current = nextStyle;
        if (entryRef.current) {
          entryRef.current = SystemBars.replaceStackEntry(entryRef.current, {
            style: { statusBar: getStatusBarStyle(scheme, nextStyle) },
          });
        }
      },
      [scheme],
    ),
  };
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
