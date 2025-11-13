import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { Icon, Button } from 'atoms';
import { SCREEN_WIDTH } from 'services/PlatformService';
import { themeStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { ILabelError } from 'core/types';
import { useThemeStyles } from 'core/hooks';
import { composeTestID } from 'core/helpers';

const ratio = 281 / 373;
const width = SCREEN_WIDTH;
const height = width * ratio;
interface IProps {
  error: Pick<ILabelError, 'text' | 'title'>;
  buttonText?: string;
  onButtonPress?: () => void;
  testID: string;
}

export const ErrorView = memo(
  ({ onButtonPress, error, buttonText, testID }: IProps) => {
    const { t } = useTranslation('common');
    const styles = useThemeStyles(themeStyles);
    return (
      <View style={styles.container}>
        <Icon style={styles.icon} name="error" width={width} height={height} />
        {error.title ? <Text style={styles.title}>{error.title}</Text> : null}
        <Text style={styles.text}>{error.text}</Text>
        <Button
          style={styles.buttonContainer}
          onPress={onButtonPress}
          text={buttonText || t('tryAgain')}
          testID={composeTestID(testID, 'tryAgainButton')}
        />
      </View>
    );
  },
);
