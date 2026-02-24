import { AppError } from '@core/model';
import { Button, Icon } from 'components/atoms';
import { composeTestID } from 'core/helpers';
import { type TFunction } from 'i18next';
import { isObject } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Text, useWindowDimensions, View } from 'react-native';

interface ErrorViewProps {
  testID: string;
  error: AppError.Unknown;
  retryLabel?: string;
  onRetry?: () => void;
  getErrorMessages?: (
    error: AppError.Unknown,
    t: TFunction,
  ) => {
    title: string;
    text: string;
  };
}

export const ErrorView = ({
  testID,
  error,
  getErrorMessages = getAppErrorMessages,
  retryLabel,
  onRetry,
}: ErrorViewProps) => {
  const { t } = useTranslation('common');
  const { title, text } = getErrorMessages(error, t);

  const { width: windowWidth } = useWindowDimensions();

  const ratio = 281 / 373;
  const height = windowWidth * ratio;

  return (
    <View
      testID={testID}
      className="bg-background-primary absolute inset-0 items-center justify-center px-gutter">
      <Icon name="error" width={windowWidth} height={height} />
      {title ? (
        <Text
          testID={composeTestID(testID, 'title')}
          className="font-title3Bold mb-4 text-center text-primary">
          {title}
        </Text>
      ) : null}
      <Text
        testID={composeTestID(testID, 'text')}
        className="font-subheadlineRegular text-center text-secondary">
        {text}
      </Text>
      <Button
        className="mt-8 self-stretch"
        testID={composeTestID(testID, 'retryButton')}
        onPress={onRetry}
        text={retryLabel || t('tryAgain')}
        theme="quarterly"
        withBorder={false}
      />
    </View>
  );
};

const getAppErrorMessages = (error: AppError.Unknown, t: TFunction) => {
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

  return errorTranslation as { title: string; text: string };
};
