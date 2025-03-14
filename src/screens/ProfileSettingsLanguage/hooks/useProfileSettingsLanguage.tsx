import {changeLanguageRequest} from 'core/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';
import {selectAppLanguage, selectIsSystemLanguage} from 'core/selectors';
import {SupportedLocales} from 'core/types';
import {useRequestLoading} from 'react-redux-help-kit';

export const useProfileSettingsLanguage = () => {
  const dispatch = useDispatch();
  const appLanguage = useSelector(selectAppLanguage);
  const isSystemLanguage = useSelector(selectIsSystemLanguage);

  const userLanguage = isSystemLanguage ? null : appLanguage;

  const {getLoadingStateByEntityId} = useRequestLoading(changeLanguageRequest);

  const changeLanguage = useCallback(
    (language: SupportedLocales | null) => {
      dispatch(
        changeLanguageRequest(
          {
            language,
            isSystemLanguage: !language,
          },
          {entityId: language || 'defaultLocale'},
        ),
      );
    },
    [dispatch],
  );

  return {
    changeLanguage,
    userLanguage,
    getLoadingStateByEntityId,
  };
};
