import {useEffect} from 'react';

import {ColorSchemeName, StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

export function useStatusBar(theme: ColorSchemeName) {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const entry = StatusBar.pushStackEntry({
        barStyle: theme === 'dark' ? 'light-content' : 'dark-content',
        animated: true,
      });

      return () => {
        StatusBar.popStackEntry(entry);
      };
    }
  }, [isFocused, theme]);
}
