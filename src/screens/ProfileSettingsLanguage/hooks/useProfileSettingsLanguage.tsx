import {changeLanguageRequest} from 'core/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useState} from 'react';
import {selectAppLanguage, selectIsSystemLanguage} from 'core/selectors';
import {SupportedLocales} from 'core/types';
import {useRequestLoading} from 'react-redux-help-kit';

export const useProfileSettingsLanguage = () => {
  const [itemLanguage, setItemLanguage] = useState<SupportedLocales | null>(
    null,
  );

  const dispatch = useDispatch();
  const appLanguage = useSelector(selectAppLanguage);
  const isSystemLanguage = useSelector(selectIsSystemLanguage);

  const userLanguage = isSystemLanguage ? null : appLanguage;

  const {loading} = useRequestLoading(changeLanguageRequest);

  const changeLanguage = useCallback(
    (language: SupportedLocales | null) => {
      setItemLanguage(language);
      dispatch(
        changeLanguageRequest({
          language,
          isSystemLanguage: language ? false : true,
        }),
      );
    },
    [dispatch],
  );

  return {changeLanguage, userLanguage, loading, itemLanguage, setItemLanguage};
};
