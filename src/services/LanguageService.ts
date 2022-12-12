import * as RNLocalize from 'react-native-localize';
import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';
import {Platform, NativeModules} from 'react-native';

import ruTranslations from '../locale/ru.json';
import enTranslations from '../locale/en.json';
import zhTranslations from '../locale/zh.json';
import {SupportedLocales} from 'core/types';
import {DEFAULT_LOCALE} from 'core/constants';

const RESOURCES = new Map([
  ['ru' as const, ruTranslations],
  ['en' as const, enTranslations],
  ['zh' as const, zhTranslations],
]);

class LanguageService {
  getSupportedLanguages() {
    return [...RESOURCES.keys()];
  }

  getCurrentLanguage() {
    return this.getPreferredLanguage();
  }

  public getPreferredLanguage(): string {
    const localLanguage = RNLocalize.getLocales()?.[0]
      ?.languageCode as SupportedLocales;

    return this.getSupportedLanguages().includes(localLanguage)
      ? localLanguage
      : DEFAULT_LOCALE;
  }

  getSystemLanguage() {
    let deviceLanguage =
      Platform.OS === 'android'
        ? NativeModules.I18nManager.localeIdentifier
        : NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0];

    deviceLanguage = deviceLanguage.slice(0, 2) as SupportedLocales;

    return this.getSupportedLanguages().includes(deviceLanguage)
      ? deviceLanguage
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
