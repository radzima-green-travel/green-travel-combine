import {setLang} from 'core/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';
import {selectAppLanguage} from 'core/selectors';
import {languageService} from 'services/LanguageService';
import {SupportedLocales} from 'core/types';

export const useProfileSettingsLanguage = () => {
  const dispatch = useDispatch();
  const userLang = useSelector(selectAppLanguage);

  const changeLang = useCallback(
    (lang: SupportedLocales) => {
      dispatch(setLang(lang));
      languageService.setTranslationsCurrentLanguage(lang);
    },
    [dispatch],
  );

  return {changeLang, userLang};
};
