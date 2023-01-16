import {changeLanguageRequest} from 'core/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useRef} from 'react';
import {selectAppLanguage, selectIsSystemLanguage} from 'core/selectors';
import {SupportedLocales} from 'core/types';
import {useRequestLoading} from 'react-redux-help-kit';

export const useProfileSettingsLanguage = () => {
  const itemLanguage = useRef<SupportedLocales | null>(null);

  const dispatch = useDispatch();
  const appLanguage = useSelector(selectAppLanguage);
  const isSystemLanguage = useSelector(selectIsSystemLanguage);

  const userLanguage = isSystemLanguage ? null : appLanguage;

  const {loading} = useRequestLoading(changeLanguageRequest);

  const changeLanguage = useCallback(
    (language: SupportedLocales | null) => {
      itemLanguage.current = language;
      dispatch(
        changeLanguageRequest({
          language,
          isSystemLanguage: !language,
        }),
      );
    },
    [dispatch],
  );

  const getItemLoading = useCallback(
    (language: SupportedLocales | null) => {
      return itemLanguage.current === language && loading;
    },
    [loading],
  );

  const getItemDisabled = useCallback(
    (language: SupportedLocales | null) => {
      return loading && itemLanguage.current !== language;
    },
    [loading],
  );

  return {
    changeLanguage,
    userLanguage,
    getItemDisabled,
    getItemLoading,
  };
};
