import type { TFunction } from 'i18next';
import { isObject } from 'lodash';
import type { AppError } from '../model';
type ErrorMessage = { title: string; text: string };

type ResolvedErrorMessage<T extends AppError.Unknown | null> = T extends null
  ? null
  : ErrorMessage;

export type ErrorMessageResolver = <T extends AppError.Unknown | null>(
  error: T,
  t: TFunction,
) => ResolvedErrorMessage<T>;

export const resolveErrorMessage: ErrorMessageResolver = <
  T extends AppError.Unknown | null,
>(
  error: T,
  t: TFunction,
): ResolvedErrorMessage<T> => {
  if (error === null) {
    return null as ResolvedErrorMessage<T>;
  }

  const errorsTranslation =
    (t('errors', { returnObjects: true }) as Record<
      string,
      { title: string; text: string }
    >) ?? {};

  const maybeErrorCode = isObject(error.cause)
    ? error.cause['code']
    : undefined;

  const errorTranslation = errorsTranslation[maybeErrorCode]
    ?? errorsTranslation[error.tag]
    ?? errorsTranslation['default'] ?? { title: '', text: '' };

  return errorTranslation as ResolvedErrorMessage<T>;
};
