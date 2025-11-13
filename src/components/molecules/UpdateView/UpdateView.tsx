import React, { memo } from 'react';
import { Button, Icon } from 'atoms';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import { useColorScheme, useThemeStyles, useTranslation } from 'core/hooks';
import { themeStyles } from './styles';
import { composeTestID } from 'core/helpers';

interface UpdateBottomMenuProps {
  title: string;
  subTitle: string;
  subTitleStyle?: StyleProp<TextStyle>;
  buttonText: string;
  onUpdate: () => void;
  testID: string;
}

export const UpdateView = memo(
  ({
    title,
    subTitle,
    subTitleStyle,
    buttonText,
    onUpdate,
    testID,
  }: UpdateBottomMenuProps) => {
    const styles = useThemeStyles(themeStyles);
    const theme = useColorScheme();
    const { t } = useTranslation('updateVersion');

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.desc, subTitleStyle]}>{subTitle}</Text>
        <Icon
          name={theme === 'dark' ? 'ILSVersionUpdateDark' : 'ILSVersionUpdate'}
          width={159}
          height={180}
          style={styles.icon}
        />
        <Button
          onPress={onUpdate}
          text={t(buttonText)}
          textStyle={styles.buttonText}
          testID={composeTestID(testID, 'updateButton')}
        />
      </View>
    );
  },
);
