import {useEffect} from 'react';
import {isAndroid} from 'services/PlatformService';
import * as NavigationBar from 'expo-navigation-bar';
import {useColorScheme} from 'core/hooks';
import {COLORS} from 'assets';

export const useAndroidNavbarStyle = () => {
  const theme = useColorScheme();

  useEffect(() => {
    if (isAndroid) {
      NavigationBar.setBackgroundColorAsync(COLORS[theme].background.tabBar);
      NavigationBar.setButtonStyleAsync(theme === 'light' ? 'dark' : 'light');
    }
  }, [theme]);
};
