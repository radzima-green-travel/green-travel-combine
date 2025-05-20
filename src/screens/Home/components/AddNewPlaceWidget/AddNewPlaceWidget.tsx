import {Button, Icon} from 'atoms';
import {composeTestID} from 'core/helpers';
import {useTranslation} from 'core/hooks';
import React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {styles} from './styles';

interface AddNewPlaceWidgetProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const AddNewPlaceWidget = ({onPress, style}: AddNewPlaceWidgetProps) => {
  const {t} = useTranslation('home');

  return (
    <View testID="addNewPlaceWidget" style={[styles.container, style]}>
      <Text style={styles.title}>{t('addNewPlaceWidgetTitle')}</Text>
      <Button
        testID={composeTestID('addNewPlaceWidget', 'button')}
        theme="secondary"
        onPress={onPress}
        text={t('addNewPlaceButtonText')}
        renderIcon={textStyle => <Icon name="addLocation" style={textStyle} />}
        iconPosition="center"
        style={styles.button}
      />
    </View>
  );
};
