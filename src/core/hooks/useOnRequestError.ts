import {
  useRequestError,
  Action,
  useStaticCallback,
  useUpdateEffect,
} from 'react-redux-help-kit';
import {getRequestErrorLabels} from 'core/helpers';
import {RequestError} from 'core/errors';
import {useTranslation} from 'react-i18next';

import {useMemo} from 'react';
import {ILabelError} from 'core/types';

export function useOnRequestError(
  action: Action,
  translationsNameSpace: string,
  callback?: (errorTexts: ILabelError) => void,
  autoClear = true,
): {errorTexts: ILabelError | null; clearError: () => void} {
  const {t} = useTranslation();

  const {error, clearError} = useRequestError(action);

  const errorTexts = useMemo(() => {
    if (!error) {
      return null;
    }

    if (error instanceof RequestError) {
      const {textLabels, titleLabels} = getRequestErrorLabels(
        error,
        translationsNameSpace,
      );
      return {
        originalError: error,
        text: t(textLabels),
        title: t(titleLabels),
      };
    }

    return {
      originalError: error,
      text: t('common:errors.default.text'),
      title: t('common:errors.default.title'),
    };
  }, [error, t, translationsNameSpace]);

  const staticSuccessCallback = useStaticCallback(() => {
    if (callback && errorTexts) {
      if (autoClear) {
        clearError();
      }
      callback(errorTexts);
    }
  }, [autoClear, callback, clearError, errorTexts]);

  useUpdateEffect(() => {
    if (errorTexts) {
      staticSuccessCallback();
    }
  }, [staticSuccessCallback, errorTexts]);

  return {
    errorTexts,
    clearError,
  };
}
