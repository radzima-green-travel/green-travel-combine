import {COLORS} from 'assets/colors';
import {useColorScheme} from 'core/hooks';
import * as NavigationBar from 'expo-navigation-bar';
import {useEffect} from 'react';
import {isAndroid} from 'services/PlatformService';

export const NavbarAndroid = () => {
  const theme = useColorScheme();

  useEffect(() => {
    if (isAndroid) {
      NavigationBar.setBackgroundColorAsync(COLORS[theme].background.tabBar);
      NavigationBar.setButtonStyleAsync(theme === 'light' ? 'dark' : 'light');
    }
  }, [theme]);

  return null;
};
