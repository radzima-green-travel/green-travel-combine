import {changeLanguageRequest} from 'core/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useState} from 'react';
import {selectAppLanguage} from 'core/selectors';
import {SupportedLocales} from 'core/types';
import {useRequestLoading} from 'react-redux-help-kit';

export const useProfileSettingsLanguage = () => {
  const [itemLanguage, setItemLanguage] = useState<SupportedLocales | null>(
    null,
  );

  const dispatch = useDispatch();
  const appLanguage = useSelector(selectAppLanguage);

  const {loading} = useRequestLoading(changeLanguageRequest);

  const changeLanguage = useCallback(
    (selectedLanguage: SupportedLocales | null) => {
      setItemLanguage(selectedLanguage);
      dispatch(changeLanguageRequest(selectedLanguage));
    },
    [dispatch],
  );

  return {changeLanguage, appLanguage, loading, itemLanguage, setItemLanguage};
};
