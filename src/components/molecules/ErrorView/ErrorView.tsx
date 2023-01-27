import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {Icon, Button} from 'atoms';
import {SCREEN_WIDTH} from 'services/PlatformService';
import {themeStyles} from './styles';
import {useTranslation} from 'react-i18next';
import {ILabelError} from 'core/types';
import {useThemeStyles} from 'core/hooks';

const ratio = 281 / 373;
const width = SCREEN_WIDTH;
const height = width * ratio;
interface IProps {
  error: ILabelError;
  onTryAgainPress?: () => void;
}

export const ErrorView = memo(({onTryAgainPress}: IProps) => {
  const {t} = useTranslation('common');
  const styles = useThemeStyles(themeStyles);
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name="error" width={width} height={height} />
      <Text style={styles.text}>{t('errors.default.text')}</Text>
      <Button
        style={styles.buttonContainer}
        onPress={onTryAgainPress}
        text={t('tryAgain')}
      />
    </View>
  );
});
