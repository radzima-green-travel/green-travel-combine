import React, {memo} from 'react';
import {Button, Icon} from 'atoms';
import {StyleProp, Text, TextStyle, View} from 'react-native';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {themeStyles} from './styles';

interface UpdateBottomMenuProps {
  title: string;
  subTitle: string;
  subTitleStyle?: StyleProp<TextStyle>;
  buttonText: string;
  onUpdate: () => void;
}

export const UpdateView = memo(
  ({
    title,
    subTitle,
    subTitleStyle,
    buttonText,
    onUpdate,
  }: UpdateBottomMenuProps) => {
    const styles = useThemeStyles(themeStyles);
    const {t} = useTranslation('updateVersion');

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.desc, subTitleStyle]}>{subTitle}</Text>
        <Icon
          name={'ILSVersionUpdate'}
          width={159}
          height={180}
          style={styles.icon}
        />
        <Button
          onPress={onUpdate}
          text={t(buttonText)}
          textStyle={styles.buttonText}
        />
      </View>
    );
  },
);
