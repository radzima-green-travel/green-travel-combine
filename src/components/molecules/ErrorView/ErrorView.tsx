import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {Icon, Button} from 'atoms';
import {SCREEN_WIDTH} from 'services/PlatformService';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import {ILabelError} from 'core/types';

const ratio = 281 / 373;
const width = SCREEN_WIDTH;
const height = width * ratio;
interface IProps {
  error: ILabelError;
  onTryAgainPress?: () => void;
}

export const ErrorView = memo(({error, onTryAgainPress}: IProps) => {
  const {t} = useTranslation('common');
  return (
    <View style={styles.container}>
      <Icon name="error" width={width} height={height} />
      <Text style={styles.text}>{t(error.message.textPaths)}</Text>
      <Button style={styles.buttonContainer} onPress={onTryAgainPress}>
        {t('tryAgain')}
      </Button>
    </View>
  );
});
