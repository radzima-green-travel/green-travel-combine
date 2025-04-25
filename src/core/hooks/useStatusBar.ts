import {useCallback, useEffect, useState} from 'react';

import {StatusBar} from 'react-native';
import {THEME_TYPE} from 'core/constants';
import {useFocusEffect} from 'expo-router';

export function useStatusBar(
  theme: THEME_TYPE,
  {disabled = false}: {disabled?: boolean} = {},
) {
  const [isFocused, setIsFocused] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);

      return () => setIsFocused(false);
    }, []),
  );
  console.log(isFocused);
  useEffect(() => {
    if (isFocused && !disabled) {
      const entry = StatusBar.pushStackEntry({
        barStyle: theme === 'dark' ? 'light-content' : 'dark-content',
        animated: true,
      });

      return () => {
        StatusBar.popStackEntry(entry);
      };
    }
  }, [isFocused, theme, disabled]);
}
