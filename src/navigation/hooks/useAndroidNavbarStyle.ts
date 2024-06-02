import {useEffect} from 'react';
import {isAndroid} from 'services/PlatformService';
import * as NavigationBar from 'expo-navigation-bar';
import {useColorScheme} from 'core/hooks';
import {COLORS} from 'assets';

export const useAndroidNavbarStyle = () => {
  const theme = useColorScheme();

  useEffect(() => {
    if (isAndroid) {
      if (theme === 'light') {
        NavigationBar.setBackgroundColorAsync(COLORS.light.background.tabBar);
        NavigationBar.setButtonStyleAsync('dark');
      } else {
        NavigationBar.setBackgroundColorAsync(COLORS.dark.background.tabBar);
        NavigationBar.setButtonStyleAsync('light');
      }
    }
  }, [theme]);
};
