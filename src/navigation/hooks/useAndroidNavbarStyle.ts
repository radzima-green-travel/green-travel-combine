import {useEffect} from 'react';
import {isAndroid} from 'services/PlatformService';
import * as NavigationBar from 'expo-navigation-bar';
import {useColorScheme} from 'core/hooks';

export const useAndroidNavbarStyle = () => {
  const theme = useColorScheme();

  useEffect(() => {
    if (isAndroid) {
      if (theme === 'light') {
        NavigationBar.setButtonStyleAsync('dark');
      } else {
        NavigationBar.setButtonStyleAsync('light');
      }
    }
  }, [theme]);
};
