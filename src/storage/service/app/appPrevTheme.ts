import {THEMES} from 'core/constants';
import {storage} from '../../Storage';

export async function getAppPrevThemeFromStorage(): Promise<string | null> {
  const theme: THEMES | null = await storage.get({
    key: 'appPrevTheme',
  });
  return theme;
}

export async function setAppPrevThemeToStorage(theme: THEMES): Promise<void> {
  return storage.set({key: 'appPrevTheme', value: theme});
}
