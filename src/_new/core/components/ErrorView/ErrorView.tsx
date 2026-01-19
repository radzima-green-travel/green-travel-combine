import { View, Text } from 'react-native';
import { AppError } from '@core/model';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/atoms';
import { composeTestID } from 'core/helpers';
import type { TFunction } from 'i18next';

interface ErrorViewProps {
  testID: string;
  error: AppError.Unknown;
  retryLabel?: string;
  onRetry: () => void;
  getErrorMessages?: (
    error: AppError.Unknown,
    t: TFunction,
  ) => {
    title: string;
    description: string;
  };
}

export const ErrorView = ({
  testID,
  error,
  getErrorMessages = getAppErrorMessages,
  retryLabel,
  onRetry,
}: ErrorViewProps) => {
  const { t } = useTranslation();
  const { title, description } = getErrorMessages(error, t);

  return (
    <View testID={testID}>
      <Text
        testID={composeTestID(testID, 'title')}
        className="font-title3Bold text-primary">
        {title}
      </Text>
      <Text
        testID={composeTestID(testID, 'description')}
        className="font-subheadlineRegular text-secondary">
        {description}
      </Text>
      <Button
        testID={composeTestID(testID, 'retryButton')}
        onPress={onRetry}
        text={retryLabel || t('common.tryAgain')}
        theme="quarterly"
      />
    </View>
  );
};

const getAppErrorMessages = (error: AppError.Unknown, t: TFunction) => {
  const defaultTitle = t('common.errors.unknown.title');
  const defaultDescription = t('common.errors.unknown.description');

  // TODO: Add instanceof checks for other error types

  return {
    title: defaultTitle,
    description: defaultDescription,
  };
};
