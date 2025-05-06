import {Button, Icon} from 'atoms';
import {composeTestID} from 'core/helpers';
import {useTranslation} from 'core/hooks';
import React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {styles} from './styles';

interface AddLocationWidgetProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const AddLocationWidget = ({onPress, style}: AddLocationWidgetProps) => {
  const {t} = useTranslation('home');

  return (
    <View testID="addLocationWidget" style={[styles.container, style]}>
      <Text style={styles.title}>{t('addLocationWidgetTitle')}</Text>
      <Button
        testID={composeTestID('addLocationWidget', 'button')}
        theme="secondary"
        onPress={onPress}
        text={t('addLocationButtonText')}
        renderIcon={textStyle => <Icon name="addLocation" style={textStyle} />}
        iconPosition="center"
      />
    </View>
  );
};
