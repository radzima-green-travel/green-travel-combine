import {NativeModules, Platform} from 'react-native';

import * as RNLocalize from 'react-native-localize';
import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';

import ruTranslations from '../locale/ru.json';
import enTranslations from '../locale/en.json';
import zhTranslations from '../locale/zh.json';

import {SupportedLocales} from 'core/types';

/**
 * NOTE: Add language code to SupportedLocales type
 * before adding new language
 */
const RESOURCES = new Map([
  ['ru' as const, ruTranslations],
  ['en' as const, enTranslations],
  ['zh' as const, zhTranslations],
]);

class LanguageService {
  private initialData: object;

  /**
   * Constructor
   */
  constructor() {
    const resources = Object.fromEntries(RESOURCES);
    this.initialData = {
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    };
  }

  getSupportedLanguages() {
    return [...RESOURCES.keys()];
  }

  getCurrentLanguage() {
    return i18n.language as SupportedLocales;
  }

  /**
   * Get all available files with translations via Object.keys(this.#resources)
   * and find best available language via findBestAvailableLanguage()
   * 'findBestAvailableLanguage' payed attention to
   * selected preferred language in app settings:
   * Device lang: 'en', app lang: 'ru' - will return 'ru'
   */
  public getPreferredLanguage(): string {
    const preferredLang = RNLocalize.findBestAvailableLanguage(
      this.getSupportedLanguages(),
    );

    const deviceLang =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale
        : NativeModules.I18nManager.localeIdentifier;

    return preferredLang?.languageTag || deviceLang;
  }

  /**
   * Changes the language of the application
   */
  public changeAppLanguage(lang: SupportedLocales): void {
    i18n.changeLanguage(lang);
  }

  /**
   * Init language service
   */
  public init(): void {
    i18n.use(initReactI18next).init(this.initialData);

    const language = this.getPreferredLanguage();

    i18n.changeLanguage(language);
  }
}

export const languageService = new LanguageService();
