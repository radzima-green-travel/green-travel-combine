import * as RNLocalize from 'react-native-localize';
import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';

import ruTranslations from '../locale/ru.json';
import enTranslations from '../locale/en.json';
import {SupportedLocales} from 'core/types';
import {DEFAULT_LOCALE} from 'core/constants';

const RESOURCES = new Map([
  ['ru' as const, ruTranslations],
  ['en' as const, enTranslations],
]);

class LanguageService {
  getSupportedLanguages() {
    return [...RESOURCES.keys()];
  }

  getCurrentLanguage() {
    return this.getPreferredLanguage();
  }

  isLanguageSupported(locale: SupportedLocales) {
    return this.getSupportedLanguages().includes(locale);
  }

  public getPreferredLanguage(): string {
    const systemSettingsLanguage = RNLocalize.getLocales()?.[0]
      ?.languageCode as SupportedLocales;

    return this.isLanguageSupported(systemSettingsLanguage)
      ? systemSettingsLanguage
      : DEFAULT_LOCALE;
  }

  setTranslationsCurrentLanguage(locale: SupportedLocales) {
    i18n.changeLanguage(locale);
  }

  public init(): void {
    i18n.use(initReactI18next).init({
      resources: Object.fromEntries(RESOURCES),
      lng: this.getPreferredLanguage(),
      fallbackLng: DEFAULT_LOCALE,
      interpolation: {
        escapeValue: false,
      },
    });
  }
}

export const languageService = new LanguageService();
