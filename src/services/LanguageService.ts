import {NativeModules, Platform} from 'react-native';

import * as RNLocalize from 'react-native-localize';
import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';

import ruTranslations from '../locale/ru.json';
import enTranslations from '../locale/en.json';

class LanguageService {
  private resources: object = {
    ru: ruTranslations,
    en: enTranslations,
  };

  private initialData: object;

  /**
   * Constructor
   */
  constructor() {
    const resources = this.resources;
    this.initialData = {
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    };
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
      Object.keys(this.resources),
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
  public changeAppLanguage(lang: string): void {
    i18n.changeLanguage(lang);
  }

  /**
   * Init language service
   */
  public init(): void {
    i18n.use(initReactI18next).init(this.initialData);

    const language = this.getPreferredLanguage();

    this.changeAppLanguage(language);
  }
}

export const languageService = new LanguageService();
