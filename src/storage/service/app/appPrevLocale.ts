import {SupportedLocales} from 'core/types';
import {storage} from '../../Storage';

export async function getAppPrevLocaleFromStorage(): Promise<string | null> {
  const version: SupportedLocales | null = await storage.get({
    key: 'appPrevLocale',
  });
  return version;
}

export async function setAppPrevLocaleToStorage(
  locale: SupportedLocales,
): Promise<void> {
  return storage.set({key: 'appPrevLocale', value: locale});
}
