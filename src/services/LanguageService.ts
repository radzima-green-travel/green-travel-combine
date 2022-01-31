import {NativeModules, Platform} from 'react-native';

import * as RNLocalize from 'react-native-localize';
import i18n from 'i18next';

class LanguageService {
  /**
   * Get all available files with translations via i18n.languages
   * and find best available language via findBestAvailableLanguage()
   * 'findBestAvailableLanguage' payed attention to
   * selected preferred language in app settings:
   * Device lang: 'en', app lang: 'ru' - will return 'ru'
   *
   * @returns {string}
   */
  public getPreferredLanguage(): string {
    // const languagesList = i18n.languages;

    const preferredLang = RNLocalize.findBestAvailableLanguage(['en', 'ru']);

    const deviceLang =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale
        : NativeModules.I18nManager.localeIdentifier;

    return preferredLang?.languageTag || deviceLang;
  }
}

export const languageService = new LanguageService();
