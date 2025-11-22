import { useEffect } from 'react';

import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export function useLightStatusBar() {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const entry = StatusBar.pushStackEntry({
        barStyle: 'light-content',
        animated: true,
      });

      return () => {
        StatusBar.popStackEntry(entry);
      };
    }
  }, [isFocused]);
}
