import {changeLanguageRequest} from 'core/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';
import {selectAppLanguage} from 'core/selectors';
import {SupportedLocales} from 'core/types';
import {useRequestLoading} from 'react-redux-help-kit';

export const useProfileSettingsLanguage = () => {
  const dispatch = useDispatch();
  const appLanguage = useSelector(selectAppLanguage);

  const {loading} = useRequestLoading(changeLanguageRequest);

  const changeLanguage = useCallback(
    (selectedLanguage: SupportedLocales) => {
      dispatch(changeLanguageRequest(selectedLanguage));
    },
    [dispatch],
  );

  return {changeLanguage, appLanguage, loading};
};
