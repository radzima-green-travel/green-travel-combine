import React, {memo, useMemo} from 'react';
import {View, Text} from 'react-native';
import {ButtonsGroup} from '../ButtonsGroup';
import {composeTestID} from 'core/helpers';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps {
  testID: string;
  onConfirmPress: () => void;
  onDeclinePress: () => void;
  title: string;
  subtitle: string;
  buttonConfirmText: string;
  buttonDeclineText: string;
}

export const ConfirmMenu = memo(
  ({
    testID,
    onConfirmPress,
    onDeclinePress,
    title,
    subtitle,
    buttonConfirmText,
    buttonDeclineText,
  }: IProps) => {
    const styles = useThemeStyles(themeStyles);

    const buttons = useMemo(() => {
      return [
        {
          onPress: onDeclinePress,
          theme: 'secondary' as const,
          testID: composeTestID(testID, 'declineButton'),
          text: buttonDeclineText,
        },
        {
          onPress: onConfirmPress,
          theme: 'primary' as const,
          testID: composeTestID(testID, 'submitButton'),
          text: buttonConfirmText,
        },
      ];
    }, [
      testID,
      buttonConfirmText,
      buttonDeclineText,
      onDeclinePress,
      onConfirmPress,
    ]);
    const {bottom} = useSafeAreaInsets();

    return (
      <View testID={testID} style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <ButtonsGroup
          bottomInset={bottom}
          containerStyle={styles.buttonsContainer}
          buttons={buttons}
        />
      </View>
    );
  },
);
